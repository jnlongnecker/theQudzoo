function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["button", shadowSelector, " {border-radius: 100px;padding: 5px 10px;display: inline-block;color: rgb(25, 25, 25);font-weight: bold;font-size: 0.75rem;background: var(--bg-color);border: 0;}button:hover", shadowSelector, " {cursor: pointer;}button.static:hover", shadowSelector, " {cursor: default;}.mutant", shadowSelector, " {color: var(--mutation-color);}.true-kin", shadowSelector, " {color: var(--cybernetic-color);}.skill", shadowSelector, " {color: var(--skills-color);}.stat", shadowSelector, " {color: var(--stat-color);}.strength", shadowSelector, " {color: var(--strength-color);}.agility", shadowSelector, " {color: var(--agility-color);}.toughness", shadowSelector, " {color: var(--toughness-color);}.willpower", shadowSelector, " {color: var(--willpower-color);}.intelligence", shadowSelector, " {color: var(--intelligence-color);}.ego", shadowSelector, " {color: var(--ego-color);}.deactivated", shadowSelector, " {background: rgb(150, 150, 150);color: rgb(25, 25, 25);}"].join('');
}
export default [stylesheet];