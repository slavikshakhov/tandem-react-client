import JwtDecode from 'jwt-decode'

const defaultState = {
  // userOfferedLgs:{}
}
/*
const getUserOfferedLgs = () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: decodedToken.id }), // id: decodedToken.id
  }
  fetch('http://localhost:4000/auth/thisUserOfferedLgs', requestOptions)
    .then((resp) => resp.json())
    .then((offeredLgs) => {
      const mode = offeredLgs?.offeredlgs.length === 0 ? true : false
      console.log(offeredLgs?.offeredlgs)
      return offeredLgs?.offeredlgs
    })
}
*/
const languagesReducer = (state = defaultState, action) => {
  console.log(state)

  switch (action.type) {
    case 'SET_USER_OFFEREDLGS':
      return { ...state, userOfferedLgs: action.payload }
    /*
    case 'GET_USER_OFFEREDLGS':
      return { ...state, userOfferedLgs: getUserOfferedLgs() }
    */
    case 'SET_USER_WANTEDLGS':
      return { ...state, userWantedLgs: action.payload }
    case 'SET_OFFERED_LGS_MODE':
      return { ...state, offeredLgsMode: action.payload }
    case 'SET_WANTED_LGS_MODE':
      return { ...state, wantedLgsMode: action.payload }

    default:
      return state
  }
}

export default languagesReducer
