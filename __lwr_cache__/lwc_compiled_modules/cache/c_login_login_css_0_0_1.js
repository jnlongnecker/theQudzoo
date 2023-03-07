function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["label", shadowSelector, ", input", shadowSelector, " {display: block;}label", shadowSelector, " {font-family: var(--qud-font);}input", shadowSelector, " {font-family: var(--main-font);}h2", shadowSelector, " {font-family: var(--qud-font);font-size: 2rem;margin: 0;font-weight: 300;}form", shadowSelector, " {width: 30ch;padding: 1.5rem;border: 1px solid var(--text-color-faded);background-color: var(--bg-color-dark);}form:hover", shadowSelector, ",form:has(*:focus)", shadowSelector, " {border-color: var(--stat-color);}form", shadowSelector, " > div", shadowSelector, " {margin: 1rem 0;}form", shadowSelector, " input", shadowSelector, " {font-size: 1.2rem;border-radius: 0;border: 0;width: 100%;border-bottom: 3px solid rgba(0,0,0,0);}form", shadowSelector, " input:focus", shadowSelector, " {outline: 0;border-color: var(--willpower-color);}button", shadowSelector, " {font-size: 1.2rem;font-family: var(--qud-font);}form", shadowSelector, " button", shadowSelector, " {display: block;text-align: center;border: 1px solid var(--text-color-faded);background: rgba(0,0,0,0);color: var(--text-color-faded);padding: .5rem 0;width: 100%;}form", shadowSelector, " button:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);color: var(--stat-color);border-color: var(--stat-color);}.error", shadowSelector, " {color: var(--toughness-color);display: flex;justify-content: space-between;gap: .5rem;}.dismiss-error", shadowSelector, " {float: right;width: fit-content;padding: .5rem;}.dismiss-error:hover", shadowSelector, " {color: var(--willpower-color);border-color: var(--willpower-color);}.popup", shadowSelector, " {position: absolute;right: var(--desktop-margin-size);}.container", shadowSelector, " {display: flex;justify-content: center;align-items: flex-end;flex-direction: column;gap: 2rem;padding-top: .5rem;}.change-form", shadowSelector, " {font-size: .75rem;border: 0;display: inline;width: fit-content;color: var(--intelligence-color);text-align: left;}.change-form:hover", shadowSelector, " {background-color: rgba(0,0,0,0);cursor: pointer;}.login-btn", shadowSelector, " {background-color: rgba(0,0,0,0);border: 1px solid var(--text-color);color: var(--text-color);min-width: 10ch;padding: .25rem;}.login-btn:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);color: var(--ego-color);border-color: var(--ego-color);}.logout-btn", shadowSelector, " {background-color: rgba(0,0,0,0);border: 0;width: 10ch;color: var(--text-color-faded);padding: .25rem 0;margin-right: 1rem;}.logout-btn:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);color: var(--cybernetic-color)}"].join('');
}
export default [stylesheet];