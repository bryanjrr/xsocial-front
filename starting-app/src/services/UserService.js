import { apiClient } from "./ConfigService";

async function registerUser(user) {
  try {
    const response = await apiClient.post("/register", user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function loginUser(user) {
  try {
    const response = await apiClient.post("/login", user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function followingUsers(location) {
  try {
    const response = await apiClient.get("/user/following", {
      params: location ? { location } : {},
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUser() {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { registerUser, loginUser, followingUsers, getUser };
