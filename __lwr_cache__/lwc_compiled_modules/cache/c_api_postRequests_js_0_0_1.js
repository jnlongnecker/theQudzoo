async function attemptLogin(username, password) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let rawBody = JSON.stringify({
    "username": username,
    "password": password
  });
  let reqOptions = {
    method: "POST",
    headers: headers,
    body: rawBody
  };
  let response;
  try {
    response = await fetch("/db/login", reqOptions);
  } catch (e) {
    return;
  }
  return await response.json();
}
async function attemptRegister(username, password) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let rawBody = JSON.stringify({
    "username": username,
    "password": password
  });
  let reqOptions = {
    method: "POST",
    headers: headers,
    body: rawBody
  };
  let response = await fetch("/db/register", reqOptions);
  return await response.json();
}
async function logout() {
  let result = await fetch("/db/logout", {
    method: "POST"
  });
  return await result.json();
}
async function saveBuild(build) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let rawBody = JSON.stringify(build);
  let reqOptions = {
    method: "POST",
    headers: headers,
    body: rawBody
  };
  let response = await fetch("/db/savebuild", reqOptions);
  if (!response.ok) {
    console.log(await response.text());
  }
  return await response.json();
}
async function likeBuild(build) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let rawBody = JSON.stringify(build);
  let reqOptions = {
    method: "POST",
    headers: headers,
    body: rawBody
  };
  let response = await fetch("/db/likebuild", reqOptions);
  if (!response.ok) {
    console.log(await response.text());
  }
  return await response.json();
}
export { attemptLogin, attemptRegister, logout, saveBuild, likeBuild };