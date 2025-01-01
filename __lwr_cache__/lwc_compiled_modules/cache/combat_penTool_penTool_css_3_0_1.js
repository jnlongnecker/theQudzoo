function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["form", shadowSelector, " {display: flex;flex-direction: column;justify-content: center;gap: 1rem;}section", shadowSelector, " {display: grid;grid-template-columns: 1fr 2fr;gap: 1rem;}h2", shadowSelector, " {margin: 0;font-weight: normal;font: var(--qud-font);color: var(--stat-color);font-size: 1.5rem;}.form-section", shadowSelector, " {display: flex;flex-direction: column;justify-content: center;align-items: center;}.inline-icon", shadowSelector, " {height: 1em;float: none;margin: 0;padding: 0;clear: both;display: inline;position: relative;top: 2px;min-width: 13px;}.stat", shadowSelector, " {font: var(--qud-font);font-weight: bold;color: var(--stat-color);}.stat", shadowSelector, "::before {content: \" \";}.pv", shadowSelector, "::before {content: \"→ \";color: #77bfcf;}.result-section", shadowSelector, " {display: flex;flex-direction: column;align-items: center;justify-content: flex-start;}.result", shadowSelector, " {font: var(--qud-font);font-size: 2rem;}"].join('');
}
export default [stylesheet];