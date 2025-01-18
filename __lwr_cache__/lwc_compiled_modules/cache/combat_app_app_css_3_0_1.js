function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".app-container", shadowSelector, " {display: grid;grid-template-columns: 1fr 3fr 1fr;gap: 0.5rem;margin: 1rem 0;}"].join('');
}
export default [stylesheet];