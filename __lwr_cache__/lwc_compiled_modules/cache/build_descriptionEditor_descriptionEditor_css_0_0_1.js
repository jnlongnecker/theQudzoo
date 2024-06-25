import stylesheet0 from "styles/scrollbar";

function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["h2", shadowSelector, " {font-family: var(--qud-font);text-align: center;font-weight: 400;color: var(--stat-color);}a", shadowSelector, " {color: var(--anchor-unvisited-color);}a:visited", shadowSelector, " {color: var(--anchor-visited-color);}textarea", shadowSelector, " {box-sizing: border-box;width: calc(100% - 0.5rem);height: calc(100% - 1rem);max-width: calc(100% - 0.5rem);max-height: calc(100% - 1rem);background-color: transparent;color: var(--text-color-faded);padding: 7px;border-radius: 5px;border: 1px solid var(--text-color-dark);}textarea:focus", shadowSelector, " {outline: 0;border-color: var(--code-color);}.container", shadowSelector, " {padding: 0 1rem;}.build-container", shadowSelector, " {height: 33vh;min-height: 33vh;margin-bottom: 1rem;overflow-y: auto;}@media only screen and (max-width: 900px) {.build-container", shadowSelector, " {height: 50vh;min-height: 50vh;}}"].join('');
}
export default [stylesheet0, stylesheet];