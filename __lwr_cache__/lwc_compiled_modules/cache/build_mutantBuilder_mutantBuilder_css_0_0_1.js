function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [(useActualHostSelector ? ":host {--offset: 0;}" : [hostSelector, " {--offset: 0;}"].join('')), ".next", shadowSelector, ",\r.previous", shadowSelector, " {height: 100%;z-index: 1;background-color: rgba(0, 0, 0, 0);color: var(--stat-color);font-size: 1.5rem;border: 0;box-sizing: border-box;}.next:hover", shadowSelector, ",\r.previous:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);}.next[disabled]", shadowSelector, ",\r.previous[disabled]", shadowSelector, " {opacity: 0;}.next[disabled]:hover", shadowSelector, ",\r.previous[disabled]:hover", shadowSelector, " {background-color: transparent;cursor: default;}.builder-container", shadowSelector, " {display: grid;grid-template-columns: 5rem 1fr 5rem;}.scroll-container", shadowSelector, " {overflow: hidden;}.scrolling-banner", shadowSelector, " {display: grid;grid-template-columns: repeat(4, 100%);left: calc(var(--offset) * -100%);position: relative;transition: 0.5s;height: fit-content;}@media only screen and (max-width: 900px) {.builder-container", shadowSelector, " {display: grid;grid-template-columns: 2rem 1fr 2rem;}.scroll-container", shadowSelector, " {max-width: 100vw;}}"].join('');
}
export default [stylesheet];