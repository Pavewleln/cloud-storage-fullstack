const ERROR_CODES = {
    CAN_NOT_GET_FILES: 'Файлы не найдены',
    INVALID_TOKEN: 'Невалидный токен. Возможно истек срок его действия. Пожалуйста, авторизуйтесь',
    AUTH_ERROR: 'Не удалось авторизоваться',
    USER_NOT_FOUND: 'Пользователь не найден',
    INVALID_PASSWORD: 'Неправильная почта или пароль',
    UNCORRECT_FIRSTNAME: 'Имя должно состоять из 3-12 символов',
    UNCORRECT_LASTNAME: 'Фамилия должно состоять из 3-12 символов',
    EMAIL_NOT_FOUND: 'Неправильная почта или пароль',
    UNCORRECT_REQUEST: 'Неправильный запрос',
    USER_WAS_CREATED: 'Пользователь создан',
    SERVER_ERROR: 'Что-то пошло не так :(',
    FILE_ALREADY_EXIST: 'Такой файл уже есть',
    DIR_IS_NOT_EMPTY: 'Данная папка не пуста'
}

export function errors(code){
    return ERROR_CODES[code] ? ERROR_CODES[code] : code
}