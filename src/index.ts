import type MarkdownIt from "markdown-it/lib"
import newthought_plugin from "./rules/newthought"
import sidenote_plugin from "./rules/sandbox"

export default function plugin(md: MarkdownIt) {
  newthought_plugin(md)
  sidenote_plugin(md)
}
