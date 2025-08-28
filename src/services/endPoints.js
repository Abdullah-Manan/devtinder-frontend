import { axiosApi } from "../providers/axiosInstances";

export const getFeed = async (params = {}) => {
  const response = await axiosApi.get("/feed", { params });
  return response.data;
};

export const userRequestSend = async (userId, status) => {
  const response = await axiosApi.post(`/request/send/${status}/${userId}`);
  return response.data;
};

export const userRequestReview = async (requestId, status) => {
  const response = await axiosApi.post(
    `/request/review/${status}/${requestId}`
  );
  return response.data;
};

export const getConnections = async () => {
  const response = await axiosApi.get("/user/connections");
  return response.data;
};

export const getRequests = async () => {
  const response = await axiosApi.get("/user/request/received");
  return response.data;
};
