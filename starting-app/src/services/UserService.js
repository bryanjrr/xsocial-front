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

async function followingUsers(token, location) {
  try {
    console.log(location);
    let response = await fetch(
      `http://127.0.0.1:8000/api/user/following?location=${location}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getUser(token) {
  try {
    let response = await fetch(`http://127.0.0.1:8000/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export { registerUser, loginUser, followingUsers, getUser };
