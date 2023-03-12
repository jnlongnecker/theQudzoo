function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["section", shadowSelector, " {padding: 0 var(--desktop-margin-size);}h1", shadowSelector, " {display: flex;gap: 0.5ch;font-weight: 500;font-size: 1.4rem;}input", shadowSelector, " {background-color: rgba(0, 0, 0, 0);border: 0;border-bottom: 2px solid var(--skills-color);color: var(--skills-color);font-size: 1rem;border-top-left-radius: 5px;border-top-right-radius: 5px;padding: 0.4rem;}input:hover", shadowSelector, " {background-color: var(--hover-darken);}input:focus", shadowSelector, " {outline: 0;background-color: var(--hover-darken);}.name", shadowSelector, " {color: var(--skills-color);}.edit-name", shadowSelector, " {background-color: transparent;fill: var(--text-color-faded);display: flex;align-items: baseline;gap: 0.5ch;border: 0;font-size: 1.4rem;font-weight: 500;padding: 0;margin: 0;height: 100%;}.edit-name:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);}.edit-name:hover", shadowSelector, " svg", shadowSelector, " {fill: var(--text-color);}.edit-name", shadowSelector, " svg", shadowSelector, " {height: 1.4rem;}@media only screen and (max-width: 900px) {section", shadowSelector, " {padding: 0 var(--mobile-margin-size);}}"].join('');
}
export default [stylesheet];