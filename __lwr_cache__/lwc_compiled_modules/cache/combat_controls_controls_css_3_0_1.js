function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".container", shadowSelector, " {height: 100%;}.tabs", shadowSelector, " {display: grid;grid-template-columns: 1fr 1fr 1fr 1fr;}.tab", shadowSelector, " {background-color: rgba(25, 25, 25, 0.5);color: var(--text-color-dark);text-align: center;font-size: 1.25rem;border-radius: 0;border: none;padding: 1rem;}.selected", shadowSelector, " {background: none;color: white;}.tab:hover", shadowSelector, " {cursor: pointer;color: white;background-color: rgba(25, 25, 25, 0.25);}.selected:hover", shadowSelector, " {cursor: default;background: none;}"].join('');
}
export default [stylesheet];