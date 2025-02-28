function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [".container", shadowSelector, " {display: flex;flex-direction: column;border-bottom: 1px solid white;padding-bottom: 1rem;}.creatures", shadowSelector, " {display: flex;flex-direction: column;gap: 1rem;}.app-container", shadowSelector, " {display: grid;grid-template-columns: 1fr 3fr 1fr;gap: 0.5rem;width: 90vw;box-sizing: border-box;padding: 1rem 0;}.log-container", shadowSelector, " {display: flex;justify-content: center;}"].join('');
}
export default [stylesheet];