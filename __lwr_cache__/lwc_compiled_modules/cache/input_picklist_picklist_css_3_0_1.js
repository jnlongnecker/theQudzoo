function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".container", shadowSelector, " {position: relative;}.option-list", shadowSelector, " {display: flex;flex-direction: column;position: absolute;background-color: var(--bg-color-dark);border: 1px solid var(--hover-darken);}.chosen", shadowSelector, " {background-color: var(--hover-darken);display: flex;gap: 0.5rem;fill: var(--stat-color);}.chosen:hover", shadowSelector, " {cursor: pointer;}.option", shadowSelector, ",\r.chosen", shadowSelector, " {font-size: 1rem;color: var(--stat-color);font-family: var(--qud-font);padding: 0.5rem;white-space: nowrap;}.option:hover", shadowSelector, " {background-color: var(--hover-darken);cursor: pointer;}"].join('');
}
export default [stylesheet];