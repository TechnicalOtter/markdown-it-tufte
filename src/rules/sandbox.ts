/* eslint-disable @typescript-eslint/no-explicit-any */
import MarkdownIt, { Options } from "markdown-it"
import Renderer from "markdown-it/lib/renderer"
import StateBlock from "markdown-it/lib/rules_block/state_block"
import Token from "markdown-it/lib/token"

function render_footnote_def(
  tokens: Token[],
  idx: number,
  options: Options,
  env: any,
  slf: Renderer
) {
  return `<aside>footnote</aside>`
}

export default function footnote_plugin(md: MarkdownIt) {
  md.renderer.rules.footnote_def = render_footnote_def

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

    console.log(state.tokens)
    state.md.block.tokenize(state, startLine, endLine)
    console.log(state.tokens)
    state.env.footnotes.defs[`:${label}`] = state.tokens.splice(
      oldLength - state.tokens.length
    )

    state.blkIndent -= 4
    state.tShift[startLine] = oldTShift
    state.sCount[startLine] = oldSCount
    state.bMarks[startLine] = oldBMark

    return true
  }

  md.block.ruler.before("reference", "footnote_def", footnote_def)
}
