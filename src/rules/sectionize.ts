import type MarkdownIt from "markdown-it"
import type StateCore from "markdown-it/lib/rules_core/state_core"

function getSectionPair(state: StateCore) {
  const open = new state.Token("section_open", "section", 1)
  open.block = true
  const close = new state.Token("section_close", "section", -1)
  close.block = true

  return { open, close }
}

function sectionize(state: StateCore) {
  const { open, close } = getSectionPair(state)
  state.tokens.unshift(open)
  state.tokens.push(close)
}

export default function footnote_plugin(md: MarkdownIt) {
  md.core.ruler.after("inline", "sectionize", sectionize)
}
