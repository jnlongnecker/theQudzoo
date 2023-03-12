async function isLoggedIn() {
  let result = await fetch("/db/login");
  if (!result.ok) {
    return false;
  }
  let json = await result.json();
  return json.user ? true : false;
}
async function getAuthenticatedUser() {
  let result = await fetch("/db/authenticated");
  return await result.json();
}
async function getBuilds(filters) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("filters", JSON.stringify(filters));
  let reqOptions = {
    method: "GET",
    headers: headers
  };
  let response = await fetch("/db/builds", reqOptions);
  return await response.json();
}
export { getBuilds, getAuthenticatedUser, isLoggedIn };