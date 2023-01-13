const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Неправильная почта или пароль',
    INVALID_PASSWORD: 'Неправильная почта или пароль',
    auth: 'Вы не вошли в систему'
}

export function errors(code){
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}