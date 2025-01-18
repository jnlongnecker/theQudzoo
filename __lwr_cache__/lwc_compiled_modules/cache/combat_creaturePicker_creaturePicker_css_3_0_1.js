function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".container", shadowSelector, " {display: flex;flex-direction: column;align-items: center;}"].join('');
}
export default [stylesheet];