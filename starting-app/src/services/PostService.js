import { apiClient } from "./ConfigService";

async function UserPost(postData) {
  const formData = new FormData();
  formData.append("content", postData.content);
  if (postData.gif) {
    formData.append("gif", postData.gif);
  }

  // axios lanza error en 4xx/5xx automáticamente
  const response = await apiClient.post("/user/post", formData);
  return response.data;
}

export { UserPost };
