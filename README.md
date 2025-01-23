# Markdown-It Tufte

[![ci-badge]][ci-link]
[![npm-badge]][npm-link]

> A markdown-it plugin for creating documents compatible with Tufte CSS.

[ci-badge]: https://github.com/neillrobson/markdown-it-tufte/workflows/CI/badge.svg
[ci-link]: https://github.com/neillrobson/markdown-it-tufte/actions
[npm-badge]: https://img.shields.io/npm/v/markdown-it-tufte.svg
[npm-link]: https://www.npmjs.com/package/markdown-it-tufte

## Installation & Setup

> [!WARNING]
> This plugin is still pre-1.0.0.
>
> Much of the syntax and structure is still subject to change, as I learn how to create a robust Markdown-It plugin!

Install using your favorite package manager. You can then import and register the plugin using the standard markdown-it flow:

```javascript
import MarkdownIt from "markdown-it";
import MarkdownItTufte from "markdown-it-tufte";

const mdIt = MarkdownIt().use(MarkdownItTufte, {
  // options, though this plugin has no configurability yet
});

mdIt.render("^^Emma Woodhouse^^, handsome, clever, and rich...");
```

## Usage & Syntax

### Margin notes

The standard Markdown footnote syntax is parsed into HTML that renders what Tufte CSS calls "side notes":

```markdown
Edward Tufte popularized side notes[^sidenotes] in his writing.

[^sidenotes]: Footnotes whose definitions appear inline with their references.
```

The above Markdown will add a `<span>` with both the reference number *and* footnote definition all at the reference point. Tufte CSS styles that markup to put the definition off to the side of the main text.

This plugin supports a few additional syntaxes and variants:

- Leaving the caret outside the square brackets allows you to write the note contents entirely inline with the text, ideal for very short clarifications.

  ```markdown
  Edward Tufte popularized side notes^[inline footnotes] in his writing.
  ```

- Prefixing the note definition with `{-}` creates a note *without a reference number*. Since Tufte CSS positions all notes next to the relevant text, this variant reduces noise in the main material without losing the note's context.

  ```markdown
  Edward Tufte popularized side notes[^sidenotes] in his writing.
  When they don't have reference numbers^[{-} little superscript digits] associated with them, they are called "margin notes."

  [^sidenotes]: {-} Footnotes whose definitions appear inline with their references.
  ```

### "New thought" paragraph openers

### Section splitting & URL-fragment hyperlinking

### Figure images

## To-Do List

- [x] Complete side-note/margin-note implementation (specifically, the `{-}` prefix)
- [x] Automatically split `<section>`s, based on `newthought`s and `h2`s
- [x] Change `newthought` to requiring a double caret `^^` delimiter (maybe?)

Most likely, once the above items are complete, we'll do the first NPM-published package.
There are plenty of "post-release" items to consider though:

- [x] Syntax for `<figure>`s
  - [x] Support `.fullwidth` as well (using `markdown-it-attrs`)
- [ ] Epigraph-style block quotes, and `<footer>` citations
- [x] "Slug IDs" for sections (both header and newthought-based), for easy linking
- [ ] Brainstorm: `<section>` splitting on `<hr>`.

    Should it be done automatically? Perhaps choose one of the three possible markers (`*` `-` `_`) to be an "invisible" break, replaced with simply a `</section><section>`.

    Note that, in doing so, we will also need to strip out empty (consecutive) sections created by e.g. a `***` followed by an second-level heading.

### Chores

To-do items that are not features or functional changes.

- [x] Add a [CHANGELOG](https://keepachangelog.com/en/1.1.0/)
- [x] Update demo site to use Tufte CSS submodule: perhaps needs an iframe so that `<body>` tag is present?
- [ ] Add an installation & usage guide to the README
- [ ] Add examples of "extra" CSS that can be used alongside `tufte.css` and this plugin to enhance final result
  - [ ] Header link buttons
  - [ ] Improved `figcaption` styling
    - [ ] Perhaps submit this as a PR to the official Tufte CSS repo?

## Development Workflow

**Setup**:

```
npm install
```

**Testing**:

```
npm test
```

**Building**:

```
npm build
```

**Publishing**:

- Make sure the README and CHANGELOG are up to date for the version number _about to be created_.

- Bump the NPM package version:

    ```
    npm version [patch|minor|major] -s "My release notes"
    ```

- Push the commit and tag to Github:

    ```
    git push --follow-tags
    ```

- Publish to the NPM registry (this will run the build task automatically beforehand):

    ```
    npm publish
    ```
