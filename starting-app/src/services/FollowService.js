async function UnfollowUser(token, user) {
  try {
    console.log(user);
    let response = await fetch(`http://127.0.0.1:8000/api/user/following`, {
      method: "DELETE",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function followUser(token, user) {
  try {
    let response = await fetch(`http://127.0.0.1:8000/api/user/following`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export { UnfollowUser, followUser };
