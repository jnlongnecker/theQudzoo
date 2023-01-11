function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["@keyframes bounce-in", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " {0% {transform: scale(0.5, 0.5);}90% {transform: scale(1, 1);}100% {transform: scale(1, 1);}}img", shadowSelector, " {max-width: 80vw;max-height: 80vh;animation: bounce-in", shadowSelector ? ('-' + shadowSelector.substring(1, shadowSelector.length - 1)) : '', " .25s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);}.bg-darken", shadowSelector, " {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0, .8);display: flex;justify-content: center;align-items: center;z-index: 100;}.container", shadowSelector, " {background-image: var(--scanlines-image);}.bg-darken:hover", shadowSelector, " {cursor: zoom-out;}"].join('');
}
export default [stylesheet];