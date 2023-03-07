function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["section", shadowSelector, " {padding: 0 var(--desktop-margin-size);}@media only screen and (max-width: 900px) {section", shadowSelector, " {padding: 0 var(--mobile-margin-size);}}"].join('');
}
export default [stylesheet];