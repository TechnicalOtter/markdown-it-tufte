import type MarkdownIt from "markdown-it/lib"
import newthought_plugin from "./rules/newthought"

export default function plugin(md: MarkdownIt) {
  newthought_plugin(md)
}
