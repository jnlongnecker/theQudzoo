function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["main", shadowSelector, " {margin: 30px;display: flex;flex-direction: column;align-items: center;}h1", shadowSelector, " {color: #1798c1;}"].join('');
}
export default [stylesheet];