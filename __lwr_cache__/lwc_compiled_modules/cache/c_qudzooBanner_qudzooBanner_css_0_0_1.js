function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["@keyframes blink", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {opacity: 1;}49% {opacity: 1;}50% {opacity: 0;}99% {opacity: 0;}}p", shadowSelector, " {color: var(--h3-color);}div", shadowSelector, " {box-sizing: border-box;width: 100%;max-width: calc(100vw - 2 * var(--mobile-margin-size));}h1", shadowSelector, " {font-family: var(--qud-font);color: var(--qudzoo-color);font-size: 4rem;margin-bottom: 1rem;}p", shadowSelector, " {font-family: var(--qud-font);font-size: 2.2rem;text-overflow: ellipsis;overflow: hidden;}img", shadowSelector, " {border-radius: 100%;max-width: calc(100vw - 2 * var(--mobile-margin-size));text-align: center;}.banner", shadowSelector, " {display: flex;padding: 1rem 0;justify-content: center;max-width: calc(100vw - 2 * var(--mobile-margin-size));overflow: hidden;margin: 0;}.blurb", shadowSelector, " {padding-left: 20vw;color: var(--text-color);}.title", shadowSelector, " {padding-left: 20vw;}.blinker", shadowSelector, " {animation: blink", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " forwards infinite 2s;}@media only screen and (max-width: 1300px) {.banner", shadowSelector, " {flex-direction: column;align-items: center;padding: 0 var(--desktop-margin-size);justify-content: center;}.title", shadowSelector, " {padding-left: 0;min-width: 55vw;}.blurb", shadowSelector, " {padding: 0 var(--desktop-margin-size);text-align: center;}div", shadowSelector, " {width:fit-content;}}@media only screen and (max-width: 900px) {.banner", shadowSelector, " {padding: 0 var(--mobile-margin-size);}.blurb", shadowSelector, " {padding: 0 var(--mobile-margin-size);}}"].join('');
}
export default [stylesheet];