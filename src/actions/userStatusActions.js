const setRegisterMode = (mode) => {
    return { type: 'SET_REGISTER_MODE', payload: mode }
}
const setLoggedInMode = (mode) => {
    return { type: 'SET_LOGGEDIN_MODE', payload: mode }
}

export default {
    setRegisterMode,
    setLoggedInMode
}