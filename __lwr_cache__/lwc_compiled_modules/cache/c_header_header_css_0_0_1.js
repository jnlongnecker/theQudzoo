function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["@keyframes bounce", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform:translateX(0);}20% {transform: translateX(-.25rem);}40% {transform: translateX(0);}}@keyframes collapseTop", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform: rotate(0);left: calc(var(--hamburger-size) * -0.25);}50% {transform: rotate(0);left: calc(var(--hamburger-line-weight) * 2);}100% {transform: rotate(45deg);left: calc(var(--hamburger-line-weight) * 2);}}@keyframes collapseBottom", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform: rotate(0);left: calc(var(--hamburger-size) * .75 - var(--hamburger-line-weight));}50% {transform: rotate(0);left: calc(var(--hamburger-line-weight) * 2);}100% {transform: rotate(-45deg);left: calc(var(--hamburger-line-weight) * 2);}}@keyframes collapseMiddle", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform: rotate(0);}50% {transform: rotate(0);}100% {transform: rotate(45deg);}}@keyframes expandTop", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform: rotate(0);left: calc(var(--hamburger-size) * -0.25);}50% {transform: rotate(0);left: calc(var(--hamburger-line-weight) * 2);}100% {transform: rotate(45deg);left: calc(var(--hamburger-line-weight) * 2);}}@keyframes expandBottom", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform: rotate(0);left: calc(var(--hamburger-size) * .75 - var(--hamburger-line-weight));}50% {transform: rotate(0);left: calc(var(--hamburger-line-weight) * 2);}100% {transform: rotate(-45deg);left: calc(var(--hamburger-line-weight) * 2);}}@keyframes expandMiddle", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform: rotate(0);}50% {transform: rotate(0);}100% {transform: rotate(45deg);}}", (useActualHostSelector ? ":host {--hamburger-size: 1.25rem;--hamburger-line-weight: 2px;}" : [hostSelector, " {--hamburger-size: 1.25rem;--hamburger-line-weight: 2px;}"].join('')), "header", shadowSelector, " {position: sticky;display: flex;justify-content: space-between;align-items: center;top: 0;border-bottom: 3px solid var(--text-color-faded);background-color: var(--bg-color-dark);height: calc(var(--heading-height) - 3px);padding: 0 var(--desktop-margin-size);z-index: 1;}a", shadowSelector, " {color: var(--text-color);text-decoration: none;}a:hover", shadowSelector, " {text-decoration: underline;}hr", shadowSelector, " {border-color: var(--qudzoo-color);margin: 0;}.logo", shadowSelector, " {display: block;}.logo", shadowSelector, " a", shadowSelector, " {color: var(--qudzoo-color);font-weight: bold;}.logo", shadowSelector, " a:hover", shadowSelector, " {text-decoration: none;}.site-name", shadowSelector, " {font-size: 2rem;font-family: var(--qud-font);margin: 0;display: block;}.links", shadowSelector, " {padding-top: 2px;display: flex;justify-content: end;align-items: center;gap: 2rem;flex-grow: 1;flex-shrink: 1;}.dot-divider", shadowSelector, " {width: .25rem;height: .25rem;background-color: var(--text-color);border-radius: 100%;display: inline-block;}.hamburger-items", shadowSelector, " {position: absolute;width: calc(100vw - var(--mobile-margin-size) * 2 + 20px);right: calc(var(--mobile-margin-size) - 10px);top: calc(2rem - 10px);background: var(--bg-color-dark);list-style-type: none;overflow: hidden;max-height: 0;transition:.5s;}.hamburger-menu[status=\"open\"]", shadowSelector, "+.hamburger-items", shadowSelector, " {max-height: 33vh;transition: .5s;}.hamburger-item-container", shadowSelector, " {padding: 0 calc(10px + 2rem) 0 1rem;border: 1px solid var(--qudzoo-color);font-family: var(--qud-font);background-image: var(--scanlines-image)}.hamburger-item-container", shadowSelector, " a", shadowSelector, ",.hamburger-item-container", shadowSelector, " p", shadowSelector, " {display: block;padding: 1rem 0;margin: 0;}.hamburger-item-container", shadowSelector, " a:hover", shadowSelector, " {background-color: var(--hover-darken);}.hamburger-menu", shadowSelector, " {width: var(--hamburger-size);height: var(--hamburger-size);border: 0;background: 0;transform: rotate(90deg);z-index: 1;}.hamburger-menu:hover", shadowSelector, " {cursor: pointer;}.hamburger-menu", shadowSelector, " div", shadowSelector, " {width: var(--hamburger-line-weight);height: var(--hamburger-size);background-color: var(--text-color);transition: background-color 0.5s;}.hamburger-menu[status=\"open\"]", shadowSelector, " div", shadowSelector, " {background-color: var(--qudzoo-color);transition: background-color 0.5s;}.hamburger-menu[status=\"open\"]", shadowSelector, " .line1", shadowSelector, " {animation: .5s ease both collapseTop", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', ";}.hamburger-menu[status=\"open\"]", shadowSelector, " .line2", shadowSelector, " {animation: .5s ease both collapseMiddle", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', ";}.hamburger-menu[status=\"open\"]", shadowSelector, " .line3", shadowSelector, " {animation: .5s ease both collapseBottom", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', ";}.hamburger-menu[status=\"closed\"]", shadowSelector, " .line1", shadowSelector, " {animation: .5s ease both expandTop", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', ";animation-direction: reverse;}.hamburger-menu[status=\"closed\"]", shadowSelector, " .line2", shadowSelector, " {animation: .5s ease both expandMiddle", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', ";animation-direction: reverse;}.hamburger-menu[status=\"closed\"]", shadowSelector, " .line3", shadowSelector, " {animation: .5s ease both expandBottom", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', ";animation-direction: reverse;}.line1", shadowSelector, " {position: relative;left: calc(var(--hamburger-size) * -0.25);}.line2", shadowSelector, " {position: relative;left: calc(var(--hamburger-size) * 0.25 - var(--hamburger-line-weight) * 0.5);top: calc(var(--hamburger-size) * -1);}.line3", shadowSelector, " {position: relative;left: calc(var(--hamburger-size) * .75 - var(--hamburger-line-weight));top: calc(var(--hamburger-size) * -2);}@media only screen and (max-width: 900px) {header", shadowSelector, " {padding: 0 var(--mobile-margin-size);justify-content: space-between;}}"].join('');
}
export default [stylesheet];