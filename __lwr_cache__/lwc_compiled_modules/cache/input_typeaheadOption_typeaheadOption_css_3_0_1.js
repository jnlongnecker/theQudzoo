function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["img", shadowSelector, " {width: 100%;}p", shadowSelector, " {margin: 0;}.container", shadowSelector, " {display: flex;gap: 0.25rem;padding: 0.25rem;}.container:hover", shadowSelector, " {cursor: pointer;background-color: rgba(25, 25, 25, 0.25);}.text", shadowSelector, " {display: flex;flex-direction: column;flex-grow: 1;}.image", shadowSelector, " {display: flex;justify-content: center;align-items: center;max-width: 1.5rem;}.primary", shadowSelector, " {font-size: 1.25rem;}.secondary", shadowSelector, " {font-size: 0.875rem;}"].join('');
}
export default [stylesheet];