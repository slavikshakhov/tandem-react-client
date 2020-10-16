import JwtDecode from 'jwt-decode'

const defaultState = {
  regMode: false,
  currentUser: null,
  loggedIn: false,
  decodedToken: null,
  filteredUsers: null,
  registered: false,
}

const userStatus = (state = defaultState, action) => {
  console.log(state)
  switch (action.type) {
    case 'SET_REGISTER_MODE':
      return {
        ...state,
        regMode: action.payload,
      }

    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      }
    case 'SUCCESSFULLY_REGISTERED':
      return {
        ...state,
        registered: action.payload,
      }
    case 'LOGGEDIN':
      const jwtDecode = require('jwt-decode')
      let isExpired = true
      const dateNow = new Date()
      let decodedToken = null
      if (action.payload) {
        decodedToken = jwtDecode(action.payload)
        //console.log(jwtDecode(action.payload));
        if (decodedToken.exp < dateNow.getTime()) {
          isExpired = false
        }
      }
      console.log(isExpired)
      console.log(JSON.stringify(action.payload))
      return {
        ...state,
        loggedIn: !isExpired,
        decodedToken,
      }
    case 'FILTERED_USERS':
      return { ...state, filteredUsers: action.payload }
    default:
      return state
  }
}

export default userStatus
