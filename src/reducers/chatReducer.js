import JwtDecode from "jwt-decode";

const defaultState = {
  contactName: "",
  socket: null,
  chatter: null,
  connectedMembers: null,
};

const chatReducer = (state = defaultState, action) => {
  console.log(state);
  switch (action.type) {
    case "SET_CONTACT":
      return {
        ...state,
        contactName: action.payload,
      };
    case "SET_CHATTER":
      return {
        ...state,
        chatter: action.payload,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    /*
    case 'SET_MESSAGES':
      const {from, to, text} = action.payload;
      */
    case "SET_CONNECTED_USERS":
      return {
        ...state,
        connectedMembers: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
