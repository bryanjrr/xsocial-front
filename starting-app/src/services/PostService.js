import { apiClient } from "./ConfigService";

export const UserPost = async (postData) => {
  const formData = new FormData();
  formData.append("content", postData.content);
  if (postData.gif) {
    formData.append("gif", postData.gif);
  }

  // axios lanza error en 4xx/5xx automáticamente
  const response = await apiClient.post("/user/post", formData);
  return response.data;
};

export const getFeed = async (cursor) => {
  const params = cursor
    ? `per_page=10&after=${encodeURIComponent(cursor)}`
    : `per_page=10`;
  console.log("Solicitando feed con params:", params);
  const response = await apiClient.get(`/feed?${params}`);
  console.log("Respuesta feed:", response.data);
  return response.data;
};

export const getUserPosts = async (username, cursor) => {
  const params = cursor
    ? `per_page=10&after=${encodeURIComponent(cursor)}`
    : `per_page=10`;
  console.log("Solicitando posts de usuario:", username, "con params:", params);
  const response = await apiClient.get(`/user/${username}/posts?${params}`);
  console.log("Respuesta user posts:", response.data);
  return response.data;
};
