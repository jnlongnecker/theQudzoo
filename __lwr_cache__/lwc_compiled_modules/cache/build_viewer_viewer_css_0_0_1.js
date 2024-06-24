function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".container", shadowSelector, " {padding: 1rem var(--desktop-margin-size);display: flex;align-items: center;flex-direction: column;}.card-wrapper", shadowSelector, " {max-width: 125ch;}.description-wrapper", shadowSelector, " {width: 100%;padding: 0 10vw;box-sizing: border-box;}@media only screen and (max-width: 900px) {.container", shadowSelector, " {padding: 1rem var(--mobile-margin-size);}}@media only screen and (max-width: 1030px) {.description-wrapper", shadowSelector, " {padding: 0;}}"].join('');
}
export default [stylesheet];