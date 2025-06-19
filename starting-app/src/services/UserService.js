import * as React from "react";

async function registerUser(user) {
  try {
    let response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function loginUser(user) {
  try {
    let response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export { registerUser, loginUser };
