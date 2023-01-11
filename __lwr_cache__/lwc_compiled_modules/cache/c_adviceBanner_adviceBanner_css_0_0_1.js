function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["section", shadowSelector, " {font-family: var(--qud-font);display: flex;flex-direction: column;justify-content: center;align-items: center;border-top: 3px solid var(--hover-darken);padding: 0 var(--desktop-margin-size);}div", shadowSelector, " {width: 100%;}h2", shadowSelector, " {text-align: center;}h2", shadowSelector, " a", shadowSelector, " {color: var(--h2-color);font-weight: normal;font-size: 3rem;margin-bottom: 0;text-decoration: none;}h2", shadowSelector, " a:hover", shadowSelector, " {text-decoration: underline;}p", shadowSelector, " {max-width: 55vw;font-size: 1.5rem;text-align: center;}@media only screen and (max-width: 900px) {section", shadowSelector, " {padding: 0 var(--mobile-margin-size);}}"].join('');
}
export default [stylesheet];