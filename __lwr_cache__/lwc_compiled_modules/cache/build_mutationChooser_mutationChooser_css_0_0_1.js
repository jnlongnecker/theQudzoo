import stylesheet0 from "styles/scrollbar";
import stylesheet1 from "styles/syntax";

function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["h2", shadowSelector, " {font-family: var(--qud-font);text-align: center;font-weight: 400;color: var(--stat-color);}section", shadowSelector, " {display: grid;padding: 0 1rem;grid-template-columns: 1fr 1.5rem 2fr;}hr", shadowSelector, " {width: 0.5rem;height: 100%;overflow-y: scroll;border: 0;margin: 0 0.5rem;}fieldset", shadowSelector, " {border: 1px solid var(--text-color);font-family: var(--qud-font);border-left: 0;border-right: 0;border-bottom: 0;padding-right: 0;}legend", shadowSelector, " {font-size: 1.25rem;border-right: 1px solid var(--text-color);border-left: 1px solid var(--text-color);padding: 0 0.5rem;}ul", shadowSelector, " {padding: 0;}.marker", shadowSelector, " {display: inline-block;font-family: Impact, Haettenschweiler, \"Arial Narrow Bold\", sans-serif;width: 1ch;}.selectable:hover", shadowSelector, " {color: var(--mutation-color);cursor: pointer;user-select: none;}.disabled", shadowSelector, " {opacity: 0.3;}.disabled:hover", shadowSelector, " {cursor: default;}.morphotype", shadowSelector, " {color: var(--stat-color);}.blurb", shadowSelector, " {overflow-y: scroll;padding-right: 0.5rem;}.levelBlurb", shadowSelector, " {color: var(--skills-color);}.mutations", shadowSelector, " {overflow-y: scroll;direction: rtl;padding-left: 0.5rem;max-height: 50vh;}.mutations", shadowSelector, " *", shadowSelector, " {direction: ltr;}.mut-img", shadowSelector, " {height: 7rem;margin-top: 1rem;justify-self: center;}.selectable", shadowSelector, ",\r.disabled", shadowSelector, " {display: flex;justify-content: space-between;}.variations", shadowSelector, " {direction: rtl;display: inline-block;}.multi-btn", shadowSelector, " {margin-left: 0.5rem;display: flex;gap: 0.5rem;}.v-button", shadowSelector, " {background-color: rgba(0, 0, 0, 0);border: 0;color: var(--text-color-faded);font-family: var(--qud-font);margin: 0;padding: 0;}.v-button:hover", shadowSelector, " {color: var(--stat-color);cursor: pointer;}.blurb-format", shadowSelector, " {display: grid;grid-template-columns: 1fr 5fr;gap: 1rem;}.chosen", shadowSelector, " {color: var(--mutation-color);}.multi-chosen", shadowSelector, " {color: var(--mutation-color);}.multi-chosen", shadowSelector, " .marker", shadowSelector, " {font-family: var(--qud-font);}.positive", shadowSelector, " {color: var(--willpower-color);}.negative", shadowSelector, " {color: var(--qudzoo-color);}.options", shadowSelector, " {display: flex;flex-wrap: wrap;justify-content: center;column-gap: 3rem;row-gap: 0.5rem;font-family: var(--qud-font);width: 100%;}.options", shadowSelector, " > span:first-child", shadowSelector, " {flex-grow: 1;min-width: 100%;text-align: center;color: var(--text-color-faded);}.options", shadowSelector, " button", shadowSelector, " {width: 20ch;padding: 0.5rem 1rem;background-color: rgba(0, 0, 0, 0);border: 1px solid var(--text-color-faded);color: var(--text-color-faded);font-family: var(--qud-font);}.options", shadowSelector, " button:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);color: var(--stat-color);border-color: var(--stat-color);}.info-btn", shadowSelector, " {display: none;}@media only screen and (max-width: 1200px) {section", shadowSelector, " {display: grid;grid-template-columns: 1fr 1.5rem;padding: 0 0 0 1rem;}legend", shadowSelector, " {text-align: center;}fieldset", shadowSelector, " {padding: 0;}fieldset", shadowSelector, " ul", shadowSelector, " > *", shadowSelector, " {margin: 0.5rem;}.blurb", shadowSelector, " {position: fixed;left: 0;right: 0;top: 0;width: 100%;height: 100%;z-index: 20;background-color: rgba(0, 0, 0, 0.7);display: none;padding: 1rem;box-sizing: border-box;}.blurb.show-blurb", shadowSelector, " {display: flex;justify-content: center;align-items: center;}.blurb", shadowSelector, " fieldset", shadowSelector, " {background-color: var(--bg-color-dark);border: 2px solid var(--text-color);padding: 0.25rem 1rem 1rem;}.blurb", shadowSelector, " legend", shadowSelector, " {background-color: var(--bg-color-dark);border-top: 2px solid var(--text-color);}.info-btn", shadowSelector, " {display: block;}}"].join('');
}
export default [stylesheet0, stylesheet1, stylesheet];