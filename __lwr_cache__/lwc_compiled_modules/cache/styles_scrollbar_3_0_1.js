function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [shadowSelector, "::-webkit-scrollbar {width: 0.5rem;}", shadowSelector, "::-webkit-scrollbar-track {box-shadow: 0;}", shadowSelector, "::-webkit-scrollbar-track-piece {outline: 1px solid var(--text-color-faded);outline-offset: -0.25rem;}", shadowSelector, "::-webkit-scrollbar-thumb {background: var(--text-color);}::-webkit-scrollbar-thumb:hover", shadowSelector, " {background: var(--text-color-dark);}", shadowSelector, "::-webkit-scrollbar-button {height: 3px;background: var(--text-color);}"].join('');
}
export default [stylesheet];