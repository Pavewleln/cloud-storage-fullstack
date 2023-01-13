const ERROR_CODES = {
    CAN_NOT_GET_FILES: 'Вы еще ничего не создавали',
    INVALID_TOKEN: 'Невалидный токен. Возможно истек срок его действия. Пожалуйста, авторизуйтесь',
    AUTH_ERROR: 'Не удалось авторизоваться',
    USER_NOT_FOUND: 'Пользователь не найден',
    INVALID_PASSWORD: 'Неправильная почта или пароль',
    UNCORRECT_FIRSTNAME: 'Имя должно состоять из 3-12 символов',
    UNCORRECT_LASTNAME: 'Фамилия должно состоять из 3-12 символов',
    EMAIL_NOT_FOUND: 'Неправильная почта или пароль',
    UNCORRECT_REQUEST: 'Неправильный запрос',
    USER_WAS_CREATED: 'Пользователь создан',
    SERVER_ERROR: 'Ошибка'
}

export function errors(code){
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}