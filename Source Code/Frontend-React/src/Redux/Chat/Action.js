/* eslint-disable no-unused-vars */
import api from "@/Api/api";
import {
  CHAT_BOT_FAILURE,
  CHAT_BOT_REQUEST,
  CHAT_BOT_SUCCESS,
} from "./ActionTypes";

export const sendMessage = ({prompt,jwt}) => async (dispatch) => {
  dispatch({
    type: CHAT_BOT_REQUEST,
    payload:{prompt,role:"user"}
  });

  try {
    const { data } = await api.post("/chat/bot", {prompt},{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    });

    let botResponse = data.candidates[0]?.content?.parts[0]?.text;

    if (!botResponse) {
      throw new Error("Invalid response format from server");
    }

    // Remove `*` and `\` characters to improve readability
    botResponse = botResponse.replace(/[*\\]/g, "");
    dispatch({
      type: CHAT_BOT_SUCCESS,
      payload: {ans : botResponse , role:"model"},
    });
    console.log("get success ans",data)
  } catch (error) {
    dispatch({ type: CHAT_BOT_FAILURE, payload: error });
    console.log(error);
  }
};
