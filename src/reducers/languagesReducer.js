import JwtDecode from "jwt-decode";

const defaultState = {
  // userOfferedLgs:{}
};

const languagesReducer = (state = defaultState, action) => {
  console.log(state);

  switch (action.type) {
    case "SET_USER_OFFEREDLGS":
      return { ...state, userOfferedLgs: action.payload };
    case "SET_USER_WANTEDLGS":
      return { ...state, userWantedLgs: action.payload };
    case "SET_OFFERED_LGS_MODE":
      return { ...state, offeredLgsMode: action.payload };
    case "SET_WANTED_LGS_MODE":
      return { ...state, wantedLgsMode: action.payload };

    default:
      return state;
  }
};

export default languagesReducer;
