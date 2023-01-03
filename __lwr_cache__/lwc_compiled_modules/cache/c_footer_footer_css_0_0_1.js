function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["footer", shadowSelector, " {border-top: 2px solid var(--hover-darken);display: flex;flex-direction: column;}a", shadowSelector, " {color: var(--anchor-unvisited-color);}a:visited", shadowSelector, " {color: var(--anchor-visited-color);}.links", shadowSelector, " {border-top: 2px solid var(--hover-darken);}"].join('');
}
export default [stylesheet];