import type MarkdownIt from "markdown-it"
import type StateCore from "markdown-it/lib/rules_core/state_core.js"

/*
 * Inspired by Alexs7zzh on Github
 * https://gist.github.com/Alexs7zzh/d92ae991ad05ed585d072074ea527b5c
 */

const arrayReplaceAt = <T>(src: Array<T>, pos: number, newElements: Array<T>) => {
  return ([] as Array<T>).concat(src.slice(0, pos), newElements, src.slice(pos + 1))
}

export default function figure_plugin(md: MarkdownIt) {
  const figure_def = (state: StateCore) => {
    let nesting = 0
    for (let idx = state.tokens.length - 1; idx >= 0; idx--) {
      nesting += state.tokens[idx].nesting
      if (state.tokens[idx].type !== "inline") continue
      // Iterating backwards, hitting closing tags first:
      // -1 nesting means one level deep, -2 means two levels, etc
      if (nesting !== -1) continue

      const token = state.tokens[idx]
      if (token.children?.length !== 1) continue
      if (token.children[0].type !== "image") continue
      if (state.tokens[idx + 1].type !== "paragraph_close") continue
      if (state.tokens[idx - 1].type !== "paragraph_open") continue

      state.tokens[idx + 1] = new state.Token("figure_close", "figure", -1)
      state.tokens[idx + 1].block = true
      state.tokens[idx - 1] = new state.Token("figure_open", "figure", 1)
      state.tokens[idx - 1].block = true

      const img = token.children[0],
        caption = img.attrGet("title")

      if (!caption) continue

      const inline = new state.Token("inline", "", 0)
      inline.content = caption
      inline.block = true
      const text = new state.Token("text", "", 0)
      text.content = caption
      inline.children = [text]

      const figcaption_open = new state.Token("figcaption_open", "figcaption", 1)
      figcaption_open.block = true

      const figcaption_close = new state.Token("figcaption_close", "figcaption", -1)
      figcaption_close.block = true

      state.tokens = arrayReplaceAt(state.tokens, idx, [
        img,
        figcaption_open,
        inline,
        figcaption_close
      ])
    }
  }

  md.core.ruler.after("inline", "figure", figure_def)
}
