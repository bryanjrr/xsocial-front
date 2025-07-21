import * as React from "react";

async function UserPost(postData) {
  let token = localStorage.getItem("token");
  console.log(token);

  const formData = new FormData();
  formData.append("content", postData.content);
  if (postData.image) {
    formData.append("image", postData.image);
  }

  try {
    let response = await fetch("http://127.0.0.1:8000/api/user/post", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
export { UserPost };
