function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [shadowSelector, "::-webkit-scrollbar {width: .5rem;}", shadowSelector, "::-webkit-scrollbar-track {box-shadow: 0;}", shadowSelector, "::-webkit-scrollbar-track-piece {outline: 1px solid var(--text-color-faded);outline-offset: -.25rem;}", shadowSelector, "::-webkit-scrollbar-thumb {background: var(--text-color);}::-webkit-scrollbar-thumb:hover", shadowSelector, " {background: var(--text-color-dark);}", shadowSelector, "::-webkit-scrollbar-button {height: 3px;background: var(--text-color);}a", shadowSelector, " {text-decoration: none;}p", shadowSelector, " {margin: 0;padding: .5rem 0 .5rem .5rem;border-left: 3px solid var(--text-color-faded);}p:hover", shadowSelector, " {cursor: pointer;background-color: var(--hover-darken);}h1", shadowSelector, " {font-weight: normal;margin: 0 0 .5rem;}h1", shadowSelector, " a", shadowSelector, " {color: var(--text-color);}h1:hover", shadowSelector, " {cursor:pointer;}.container", shadowSelector, " {font-family: var(--qud-font);padding: 1.5rem var(--desktop-margin-size) 0 0;}.sections", shadowSelector, " {overflow-y: auto;overflow-x: hidden;max-height: 70vh;color: var(--h2-color);scroll-behavior: smooth;}.indented", shadowSelector, " {padding-left: 1.4rem;color: var(--h3-color);}.selected", shadowSelector, " {color: var(--h4-color);border-left: 3px solid var(--h4-color);}.selected", shadowSelector, "::before {content: \"> \";}.to-top", shadowSelector, " {padding: .5rem 0 0 0;color: var(--text-color-faded);}@media only screen and (max-width: 1300px) {.sections", shadowSelector, " {max-height: calc((100vh - var(--heading-height) )* 0.5);}.container", shadowSelector, " {padding: 1.5rem 0 0 var(--desktop-margin-size);}}"].join('');
}
export default [stylesheet];