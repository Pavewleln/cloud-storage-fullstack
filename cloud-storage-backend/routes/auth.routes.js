const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')

router.post('/registration',
    [
        check('firstname', 'UNCORRECT_FIRSTNAME').isLength({min: 3, max: 12}),
        check('lastname', 'UNCORRECT_LASTNAME').isLength({min: 3, max: 12}),
        check('email', 'EMAIL_NOT_FOUND').isEmail(),
        check('password', 'INVALID_PASSWORD').isLength({min:3, max:12})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "UNCORRECT_REQUEST", errors})
        }
        const {email, password, firstname, lastname} = req.body
        const candidate = await User.findOne({email})
        if(candidate) {
            return res.status(400).json({message: `EMAIL_NOT_FOUND`})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({firstname, lastname, email, password: hashPassword})
        await user.save()
        await fileService.createDir(new File({user:user.id, name: ''}))
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1d"})
        res.json({token, message: "USER_WAS_CREATED"})
    } catch (e) {
        console.log(e)
        res.send({message: e})
    }
})


router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "USER_NOT_FOUND"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "INVALID_PASSWORD"})
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1d"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "SERVER_ERROR"})
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1d"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "SERVER_ERROR"})
        }
    })


module.exports = router
