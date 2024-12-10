function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["h2", shadowSelector, " {font-size: 1.25rem;font-weight: 400;font-family: var(--qud-font);margin: 0;}a", shadowSelector, " {color: inherit;text-decoration: none;fill: inherit;}.setting-button", shadowSelector, " {border: 0;display: block;fill: var(--mutation-color);background-color: var(--hover-darken);border-radius: 5px;padding: 0.75rem;color: var(--mutation-color);}.setting-button:hover", shadowSelector, " {cursor: pointer;fill: rgb(25, 25, 25);background-color: var(--mutation-color);color: rgb(25, 25, 25);}.setting-button.on", shadowSelector, " {fill: rgb(25, 25, 25);background-color: var(--mutation-color);}.my-builds", shadowSelector, " {margin: 0;font-family: var(--qud-font);color: var(--stat-color);}.search", shadowSelector, " {display: flex;justify-content: start;align-items: center;gap: 1rem;}.settings", shadowSelector, " {background-color: rgb(25, 25, 25);transition: 0.5s;margin-bottom: 2rem;}.filters", shadowSelector, " {display: flex;justify-content: space-between;align-items: center;gap: 1rem;z-index: 2;padding: 0.5rem 1rem;}.shadow", shadowSelector, " {position: sticky;top: var(--heading-height);box-shadow: 2px var(--hover-darken);z-index: 5;}.shadow", shadowSelector, "::before {content: \"\";display: block;position: absolute;bottom: 0.75em;left: 0.18em;width: 40%;height: 20%;box-shadow: 0 13px 8px var(--cybernetic-color);transform: rotate(-2deg);opacity: 0.5;z-index: -1;}.shadow", shadowSelector, "::after {content: \"\";display: block;position: absolute;bottom: 0.75em;right: 0.18em;width: 40%;height: 20%;box-shadow: 0 13px 8px var(--mutation-color);transform: rotate(2deg);opacity: 0.5;z-index: -1;}.tags", shadowSelector, " {width: 100%;flex-wrap: wrap;display: flex;gap: 0.5rem;justify-content: center;padding-bottom: 1rem;}.tags", shadowSelector, " label", shadowSelector, " {flex-grow: 1;width: 100%;text-align: center;}.sort", shadowSelector, " {display: flex;flex-direction: column;box-shadow: inset 0 0.5rem 10px var(--hover-darken);}.horizontal-spread", shadowSelector, " {display: grid;grid-template-columns: repeat(3, minmax(0, 1fr));align-items: center;padding: 1rem;gap: 3rem;}.horizontal-spread", shadowSelector, " > *", shadowSelector, " {flex-grow: 1;}.option", shadowSelector, " {display: flex;flex-direction: row;align-items: center;justify-content: center;gap: 0.5rem;}.container", shadowSelector, " {display: grid;grid-template-columns: repeat(2, minmax(0, 1fr));gap: 1rem;align-items: stretch;justify-items: stretch;margin-bottom: 1rem;padding: 0 var(--desktop-margin-size);}.notification", shadowSelector, " {padding: 0 var(--desktop-margin-size) 1rem;text-align: center;fill: var(--agility-color);display: flex;justify-content: center;align-items: center;gap: 1rem;}.help-text", shadowSelector, " {margin: 0;}.mobile-help-button", shadowSelector, " {display: none;}@media only screen and (max-width: 1300px) {.container", shadowSelector, " {grid-template-columns: minmax(0, 1fr);}}@media only screen and (max-width: 900px) {.container", shadowSelector, " {padding: 0 var(--mobile-margin-size);}.notification", shadowSelector, " {padding: 0 var(--mobile-margin-size);}.mobile-help-button", shadowSelector, " {display: flex;justify-content: center;}.non-mobile-help", shadowSelector, " {display: none;}}@media only screen and (max-width: 500px) {h2", shadowSelector, " {display: none;}.horizontal-spread", shadowSelector, " {grid-template-columns: 1fr;gap: 1.5rem;}}"].join('');
}
export default [stylesheet];