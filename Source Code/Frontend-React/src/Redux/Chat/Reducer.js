import { CHAT_BOT_FAILURE, CHAT_BOT_SUCCESS, CHAT_BOT_REQUEST } from "./ActionTypes";

const initialState = {
  messages: [], // Stores all chatbot messages (user and bot)
  loading: false, // Indicates if a request is in progress
  error: null, // Stores any error messages
};

const chatBotReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_BOT_REQUEST:
      console.log("CHAT_BOT_REQUEST payload:", action.payload);
      return {
        ...state,
        loading: true,
        error: null,
        messages: [...state.messages, action.payload], // Append user's message
      };

    case CHAT_BOT_SUCCESS:
      console.log("CHAT_BOT_SUCCESS payload:", action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload], // Append bot's response
        loading: false,
        error: null,
      };

    case CHAT_BOT_FAILURE:
      console.log("CHAT_BOT_FAILURE error:", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload, // Store the error
      };

    default:
      return state;
  }
};

export default chatBotReducer;
