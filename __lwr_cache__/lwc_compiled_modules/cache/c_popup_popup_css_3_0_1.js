function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["fieldset", shadowSelector, " {border: 1px solid var(--text-color);font-family: var(--qud-font);border-left: 0;border-right: 0;border-bottom: 0;padding-right: 0;padding: 0;}legend", shadowSelector, " {font-size: 1.25rem;border-right: 1px solid var(--text-color);border-left: 1px solid var(--text-color);padding: 0 0.5rem;text-align: center;}.buttons", shadowSelector, " {display: flex;justify-content: center;gap: 1rem;padding: 1rem;flex-wrap: wrap;}.popup-container", shadowSelector, " {width: clamp(30ch, 33vw);border: 5px solid var(--text-color-dark);background-color: var(--bg-color-dark);padding: 1.5rem;}.popup-background", shadowSelector, " {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.7);display: flex;align-items: center;justify-content: center;z-index: 30;}"].join('');
}
export default [stylesheet];