function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".container", shadowSelector, " {padding: 1rem var(--desktop-margin-size);display: flex;align-items: center;flex-direction: column;}.card-wrapper", shadowSelector, " {max-width: 125ch;}@media only screen and (max-width: 900px) {.container", shadowSelector, " {padding: 1rem var(--mobile-margin-size);}}"].join('');
}
export default [stylesheet];