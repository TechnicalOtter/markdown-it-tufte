import type MarkdownIt from "markdown-it/lib"
import type StateInline from "markdown-it/lib/rules_inline/state_inline"

/**
 * Adds "newthought" spans to inline sequences delimited with ^
 */
export default function newthought_plugin(md: MarkdownIt) {
  md.inline.ruler.after("emphasis", "newthought", newthought)
}

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g

function newthought(state: StateInline, silent: boolean) {
  const max = state.posMax
  const start = state.pos

  if (state.src.charCodeAt(start) !== 0x5e /* ^ */) {
    return false
  }
  if (silent) {
    return false
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false
  }

  state.pos = start + 1
  let found = false

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5e /* ^ */) {
      found = true
      break
    }

    state.md.inline.skipToken(state)
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start
    return false
  }

  const content = state.src.slice(start + 1, state.pos)

  // found!
  state.posMax = state.pos
  state.pos = start + 1

  // Earlier we checked !silent, but this implementation does not need it
  const token_so = state.push("newthought_open", "span", 1)
  token_so.markup = "^"
  token_so.attrSet("class", "newthought")

  const token_t = state.push("text", "", 0)
  token_t.content = content.replace(UNESCAPE_RE, "$1")

  const token_sc = state.push("newthought_close", "span", -1)
  token_sc.markup = "^"

  state.pos = state.posMax + 1
  state.posMax = max
  return true
}
