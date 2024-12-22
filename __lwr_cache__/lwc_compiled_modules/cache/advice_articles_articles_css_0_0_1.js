function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["a", shadowSelector, " {text-decoration: none;color: var(--text-color);display: inline-block;padding: 0.5rem 0;}p", shadowSelector, " {margin: 0;}h1", shadowSelector, " {font-weight: normal;margin: 0;}", shadowSelector, "::marker {position: relative;left: -20px;}.container", shadowSelector, " {padding: 1rem 0 0 5rem;font-family: var(--qud-font);}a:not(.selected):hover", shadowSelector, " {color: var(--willpower-color);}.selected", shadowSelector, " {color: var(--star-filled-color);}.selected:hover", shadowSelector, " {cursor: default;}.indented", shadowSelector, " {padding-left: 1.4rem;}"].join('');
}
export default [stylesheet];