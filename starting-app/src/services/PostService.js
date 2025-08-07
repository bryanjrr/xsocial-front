import * as React from "react";
import { apiClient } from "./ConfigService";
import axios from "axios";

async function UserPost(postData) {
  const formData = new FormData();
  formData.append("content", postData.content);
  /*   if (postData.image) {
    formData.append("image", postData.image);
  } */

  try {
    let response = await apiClient.post("/user/post", formData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export { UserPost };
