function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [(useActualHostSelector ? ":host {--color-theme: white;}" : [hostSelector, " {--color-theme: white;}"].join('')), shadowSelector, "::-webkit-scrollbar {width: .5rem;}", shadowSelector, "::-webkit-scrollbar-track {box-shadow: 0;}", shadowSelector, "::-webkit-scrollbar-track-piece {outline: 1px solid var(--text-color-faded);outline-offset: -.25rem;}", shadowSelector, "::-webkit-scrollbar-thumb {background: var(--text-color);}::-webkit-scrollbar-thumb:hover", shadowSelector, " {background: var(--text-color-dark);}", shadowSelector, "::-webkit-scrollbar-button {height: 3px;background: var(--text-color);}h2", shadowSelector, " {font-family: var(--qud-font);text-align: center;font-weight: 400;color: var(--stat-color);}h3", shadowSelector, " {color: var(--text-color-faded);margin: .5rem 0;}span", shadowSelector, " {color: var(--color-theme);}.blurb", shadowSelector, " {min-height: 7rem;display: grid;grid-template-columns: 1fr 2fr 1fr;}.attribute-grid", shadowSelector, " {display: grid;grid-template-columns: repeat(6, minmax(0, 1fr));justify-items: center;align-items: center;}.stat-container", shadowSelector, " {text-align: center;border: 1px solid var(--text-color-faded);color: var(--text-color-faded);padding: .5rem 2rem;min-width: 5ch;}.point-cost", shadowSelector, " {min-width: calc(4rem + 5ch);color: var(--text-color-faded);text-align: center;align-self: flex-start;}.attribute-input", shadowSelector, " {display: flex;}.holder", shadowSelector, " {display: flex;flex-direction: column;align-items: center;font-family: var(--qud-font);}.holder:hover", shadowSelector, " .stat-container", shadowSelector, " {border-color: var(--color-theme);}.holder:hover", shadowSelector, " h3", shadowSelector, " {color: var(--color-theme);}.holder:hover", shadowSelector, " .point-cost", shadowSelector, " {color: var(--stat-color);}.buttons", shadowSelector, " {position: relative;display: flex;flex-direction: column;justify-content: flex-start;padding-top: 5px;gap: .5rem;left: -1rem;}.buttons", shadowSelector, " > button", shadowSelector, " {width: 2rem;height: 2rem;font-size: 1.5rem;display: flex;justify-content: center;align-items: center;border: 1px solid var(--text-color);border-radius: 0;background-color: var(--bg-color-dark);color: var(--text-color);}.buttons", shadowSelector, " > button:hover", shadowSelector, " {border-color: var(--color-theme);cursor: pointer;}.options", shadowSelector, " {display: flex;flex-wrap: wrap;justify-content: center;column-gap: 3rem;row-gap: .5rem;font-family: var(--qud-font);}.options", shadowSelector, " > span:first-child", shadowSelector, " {flex-grow: 1;min-width: 100%;text-align: center;color: var(--text-color-faded);}.options", shadowSelector, " button", shadowSelector, " {width: 20ch;padding: .5rem 1rem;background-color: rgba(0,0,0,0);border: 1px solid var(--text-color-faded);color: var(--text-color-faded);font-family: var(--qud-font);}.options", shadowSelector, " button:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);color: var(--stat-color);border-color: var(--stat-color);}.enhanced", shadowSelector, ", .holder:hover", shadowSelector, " .enhanced", shadowSelector, " {color: var(--willpower-color);}.reduced", shadowSelector, ", .holder:hover", shadowSelector, " .reduced", shadowSelector, " {color: var(--toughness-color);}.strength", shadowSelector, " {--color-theme: var(--strength-color);}.agility", shadowSelector, " {--color-theme: var(--agility-color);}.toughness", shadowSelector, " {--color-theme: var(--toughness-color);}.willpower", shadowSelector, " {--color-theme: var(--willpower-color);}.intelligence", shadowSelector, " {--color-theme: var(--intelligence-color);}.ego", shadowSelector, " {--color-theme: var(--ego-color);}.total", shadowSelector, ", .holder:hover", shadowSelector, " .total", shadowSelector, " {color: var(--skills-color);}.modifier", shadowSelector, " {color: var(--qudzoo-color);}@media only screen and (max-width: 1200px) {.attribute-grid", shadowSelector, " {grid-template-columns: repeat(3, minmax(0, 1fr));}}@media only screen and (max-width: 900px) {.container", shadowSelector, " {max-height: 50vh;overflow-y: auto;display: grid;grid-template-columns: repeat(2, minmax(0, 1fr));gap: .25rem;}.attribute-grid", shadowSelector, " {display: flex;flex-direction: column;}.blurb", shadowSelector, " {display: block;align-self: start;position: sticky;top: 0;padding: 0;margin: 0;}}"].join('');
}
export default [stylesheet];