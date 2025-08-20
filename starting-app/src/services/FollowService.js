import { apiClient } from "./ConfigService";

async function UnfollowUser(user) {
  try {
    const response = await apiClient.delete("/user/following", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function followUser(user) {
  try {
    const response = await apiClient.post("/user/following", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { UnfollowUser, followUser };
