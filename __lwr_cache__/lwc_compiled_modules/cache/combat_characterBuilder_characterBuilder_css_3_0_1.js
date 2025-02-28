function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".container", shadowSelector, " {display: flex;flex-direction: column;gap: 1rem;}.button-collection", shadowSelector, " {display: flex;flex-direction: column;align-items: center;gap: 0.5rem;}.buttons", shadowSelector, " {display: flex;gap: 1rem;}.button-details", shadowSelector, " {display: flex;justify-content: center;gap: 0.5rem;}"].join('');
}
export default [stylesheet];