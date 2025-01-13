/* eslint-disable jest/valid-title */
import fs from "fs"
import MarkdownIt from "markdown-it"
import example_plugin from "../src"

/** Read a "fixtures" file, containing a set of tests:
 *
 * test name
 * .
 * input text
 * .
 * expected output
 * .
 *
 * */
function readFixtures(name: string): string[][] {
  const fixtures = fs.readFileSync(`tests/fixtures/${name}.md`).toString()
  return fixtures.split("\n.\n\n").map(s => s.split("\n.\n"))
}

describe("Parses newthought", () => {
  readFixtures("newthought").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt().use(example_plugin)
    const rendered = mdit.render(text)
    it(name, () => expect(rendered).toEqual(`${expected}\n`))
  })
})

describe("Parses sidenote", () => {
  readFixtures("sidenote").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt().use(example_plugin)
    const rendered = mdit.render(text)
    it(name, () => expect(rendered).toEqual(`${expected}\n`))
  })
})

describe("Parses section", () => {
  readFixtures("sectionize").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt().use(example_plugin)
    const rendered = mdit.render(text)
    it(name, () => expect(rendered).toEqual(`${expected}\n`))
  })
})
