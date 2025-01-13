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
  // Iterate backwards since we're splicing elements into the array
  // Stop BEFORE index zero, because we always prepend an opening section tag
  for (let i = state.tokens.length - 1; i > 0; i--) {
    const token = state.tokens[i]
    if (token.type === "heading_open" && token.tag === "h2") {
      const { open, close } = getSectionPair(state)
      state.tokens.splice(i, 0, close, open)
    }
  }

  const { open, close } = getSectionPair(state)
  state.tokens.unshift(open)
  state.tokens.push(close)
  console.log(state.tokens)
}

export default function footnote_plugin(md: MarkdownIt) {
  md.core.ruler.after("inline", "sectionize", sectionize)
}
