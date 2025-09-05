import io from "socket.io-client";
import { BASE_URL } from "../common/constants";
import { getAuthToken } from "./cookies";

const createSocketConnection = () => {
  const token = getAuthToken();

  const socketOptions = {
    auth: {
      token: token,
    },
    withCredentials: true,
  };

  return io(BASE_URL, socketOptions);
};

export default createSocketConnection;
