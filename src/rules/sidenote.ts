import MarkdownIt from "markdown-it"
import StateBlock from "markdown-it/lib/rules_block/state_block"
import StateCore from "markdown-it/lib/rules_core/state_core"
import StateInline from "markdown-it/lib/rules_inline/state_inline"
import Token from "markdown-it/lib/token"

/*
 * Sidenotes are managed using three rules:
 *
 * - footnote_def: block rule. Identifies footnote definitions, tokenizes their
 * bodies (stripping p tags and replacing with br), and stores them in state.env
 * for retrieval later.
 *
 * - footnote_ref: inline rule. Identifies footnote references, and adds a
 * placeholder token with the label and any definition tokens retrieved in the
 * footnote_def rule.
 *
 * - footnote_tail: core rule (post inline). The `footnote_ref` placeholder
 * tokens only appear as children of `inline` tokens. Find each of these
 * placeholders, and split the parent `inline` token so that the placeholder
 * sits at the top level of the token array. Then, splice the footnote
 * definition into the token array immediately after the ref placeholder.
 *
 * Additionally, a renderer for the `footnote_ref` token adds the appropriate
 * markup for the label/checkbox-input toggle.
 */

function render_footnote_ref(tokens: Token[], idx: number) {
  const { label } = tokens[idx].meta

  return `<label for="sn-${label}" class="margin-toggle sidenote-number"></label><input id="sn-${label}" type="checkbox" class="margin-toggle">`
}

export default function footnote_plugin(md: MarkdownIt) {
  md.renderer.rules.footnote_ref = render_footnote_ref

  // Process footnote block definition
  function footnote_def(
    state: StateBlock,
    startLine: number,
    endLine: number,
    silent: boolean
  ) {
    // ################
    // ### IDENTIFY ###
    // ################

    const start = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    // line should be at least 5 chars - "[^x]:"
    if (start + 4 > max) return false

    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false
    if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false

    let pos

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) return false
      if (state.src.charCodeAt(pos) === 0x5d /* ] */) {
        break
      }
    }

    if (pos === start + 2) return false // no empty footnote labels
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3a /* : */) return false
    if (silent) return true
    pos++

    // #############
    // ### STORE ###
    // #############

    if (!state.env.footnotes) state.env.footnotes = {}
    if (!state.env.footnotes.defs) state.env.footnotes.defs = {}
    const label = state.src.slice(start + 2, pos - 2)

    // #############
    // ### PARSE ###
    // #############
    // Set the indent to "inside" the footnote, and tokenize subsequent blocks
    // that fall within that indent.

    const oldBMark = state.bMarks[startLine]
    const oldTShift = state.tShift[startLine]
    const oldSCount = state.sCount[startLine]
    const oldLength = state.tokens.length

    const posAfterColon = pos
    const initial =
      state.sCount[startLine] +
      pos -
      (state.bMarks[startLine] + state.tShift[startLine])
    let offset = initial

    while (pos < max) {
      const ch = state.src.charCodeAt(pos)

      if (md.utils.isSpace(ch)) {
        if (ch === 0x09) {
          offset += 4 - (offset % 4)
        } else {
          offset++
        }
      } else {
        break
      }

      pos++
    }

    state.tShift[startLine] = pos - posAfterColon
    state.sCount[startLine] = offset - initial

    state.bMarks[startLine] = posAfterColon
    state.blkIndent += 4

    if (state.sCount[startLine] < state.blkIndent) {
      state.sCount[startLine] += state.blkIndent
    }

    state.md.block.tokenize(state, startLine, endLine)
    const footnoteTokens = state.tokens.splice(oldLength - state.tokens.length)

    let hadClosingP = false
    for (let i = footnoteTokens.length - 1; i >= 0; i--) {
      const token = footnoteTokens[i]
      if (token.tag === "p") {
        const insert =
          hadClosingP && token.type === "paragraph_open"
            ? [new state.Token("softbreak", "br", 0)]
            : []
        footnoteTokens.splice(i, 1, ...insert)
      }
      hadClosingP = token.type === "paragraph_close"

      if (token.type === "inline") {
        token.children ||= []
        state.md.inline.parse(token.content, state.md, state.env, token.children)
      }
    }

    state.env.footnotes.defs[`:${label}`] = footnoteTokens

    state.blkIndent -= 4
    state.tShift[startLine] = oldTShift
    state.sCount[startLine] = oldSCount
    state.bMarks[startLine] = oldBMark

    return true
  }

  function footnote_ref(state: StateInline, silent: boolean) {
    const max = state.posMax
    const start = state.pos

    // should be at least 4 chars - "[^x]"
    if (start + 3 > max) return false

    if (!state.env.footnotes || !state.env.footnotes.defs) return false
    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false
    if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false

    let pos

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) return false
      if (state.src.charCodeAt(pos) === 0x0a) return false
      if (state.src.charCodeAt(pos) === 0x5d /* ] */) {
        break
      }
    }

    if (pos === start + 2) return false // no empty footnote labels
    if (pos >= max) return false
    pos++

    const label = state.src.slice(start + 2, pos - 1)
    if (typeof state.env.footnotes.defs[`:${label}`] === "undefined") return false

    if (!silent) {
      const token = state.push("footnote_ref", "", 0)
      token.meta = { blocks: state.env.footnotes.defs[`:${label}`], label }
    }

    state.pos = pos
    return true
  }

  function footnote_tail(state: StateCore) {
    const { tokens } = state

    // Iterate backwards because we will be inserting blocks
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i]
      if (token.type === "inline" && token.children) {
        const expandedTokens = []
        let refIdx
        while (
          (refIdx = token.children.findIndex(token => token.type === "footnote_ref")) >
          0
        ) {
          const refToken = token.children[refIdx]
          const { blocks } = refToken.meta

          const newInline = new state.Token("inline", "", 0)
          newInline.children = token.children.splice(0, refIdx + 1)
          const openSpan = new state.Token("span_open", "span", 1)
          openSpan.attrSet("class", "sidenote")

          expandedTokens.push(newInline)
          expandedTokens.push(openSpan)
          expandedTokens.push(...blocks)
          expandedTokens.push(new state.Token("span_close", "span", -1))
        }
        expandedTokens.push(token)
        if (expandedTokens.length > 1) tokens.splice(i, 1, ...expandedTokens)
      }
    }
  }

  md.block.ruler.before("reference", "footnote_def", footnote_def)
  md.inline.ruler.after("image", "footnote_ref", footnote_ref)
  md.core.ruler.after("inline", "footnote_tail", footnote_tail)
}
