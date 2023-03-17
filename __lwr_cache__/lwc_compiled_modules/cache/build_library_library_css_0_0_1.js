function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["section", shadowSelector, " {display: grid;grid-template-columns: repeat(2, minmax(0, 1fr));gap: 1rem;align-items: stretch;justify-items: stretch;margin-bottom: 1rem;}@media only screen and (max-width: 1300px) {section", shadowSelector, " {grid-template-columns: minmax(0, 1fr);}}"].join('');
}
export default [stylesheet];