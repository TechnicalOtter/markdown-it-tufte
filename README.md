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

As an alternative to separating sections of an article by headers, the first few words of a new section can be set in small-caps. Tufte CSS calls these spans "new thoughts."

The syntax is simple: surround the first few words with double carets.

```markdown
^^The quick brown fox^^ jumps over the lazy dog.
```

Note that, while any inline string of text can be surrounded by double-carets to create small caps, *only double-carets that begin a new paragraph* will receive the automatic section-splitting treatment described in the following section.

### Section splitting & URL-fragment hyperlinking

All Markdown documents will be surrounded by a `<section>` tag, regardless of contents. Tufte CSS uses sections to aid in properly positioning side notes.

Additionally, certain elements will trigger a section break: specifically, **second-level headings** and **new-thoughts initiating new paragraphs**. Although Tufte style guidelines discourage mixing these two styles, this plugin supports any combination in a single document.

The markup generated for `h2`s and `.newthought`s also includes an **empty anchor tag**, with a URL fragment link directed at that element/section. These anchors, while invisible by default, can be styled to add "copy link" buttons to those section headers.

Example input and output:

```markdown
## Recent Entries
```

```html
<div class="section-link">
  <a class="no-tufte-underline" href="#recent-entries"></a><h2 id="recent-entries">Recent Entries</h2>
</div>
```

### Figure images

Images have the same syntax as standard Markdown (i.e. `![alt text](/path/file.png "title text")`). However, when placed as solitary elements in their own paragraph, this plugin converts them into `<figure>`s as such:

```html
<figure>
  <img src="/path/file.png" alt="alt text" title="title text"><figcaption>title text</figcaption>
</figure>
```

Tufte CSS is [a bit lacking](https://github.com/edwardtufte/tufte-css/issues/44) when it comes to `<figcaption>` styling, but simple CSS overrides should be able to achieve whatever visual effect is desired (whether that be captions below the image, or off to the side as margin notes).

With the [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) plugin, the `.fullwidth` class can be added to figures too, like so:

```markdown
![alt text](/path/file.png "title text"){.fullwidth}
```

```html
<figure class="fullwidth">
  <img src="/path/file.png" alt="alt text" title="title text"><figcaption>title text</figcaption>
</figure>
```

## To-Do List

Before first NPM release (`0.1.0`):

- [x] Complete side-note/margin-note implementation (specifically, the `{-}` prefix)
- [x] Automatically split `<section>`s, based on `newthought`s and `h2`s
- [x] Change `newthought` to requiring a double caret `^^` delimiter (maybe?)

Before first major release (`1.0.0`):

- [x] Syntax for `<figure>`s
  - [x] Support `.fullwidth` as well (using `markdown-it-attrs`)
- [x] "Slug IDs" for sections (both header and newthought-based), for easy linking

At this point, we might consider **an official 1.0.0 release**.
There will probably be a period of at least a week or two where we have all the aforementioned features on a pre-1.0.0 release,
to spend some time using the plugin and discovering potential incompatibilities or pitfalls in the implementation.

The following items are potential future enhancements, but not necessary for a full-featured 1.0.0 plugin:

- [ ] Epigraph-style block quotes, and `<footer>` citations

  Although a dedicated syntax is possible, the manual HTML necessary for the same effect is pretty tame:

  ```markdown
  <div class="epigraph">

  > Lots of people are misquoted on the Internet.
  > <footer>Abraham Lincoln</footer>

  </div>
  ```

  Considering epigraphs are not a heavily-used feature per Markdown document, a bit of manual HTML is a reasonable compromise.

- [ ] `<section>` splitting on `<hr>`

  Should it be done automatically? Some writers might use horizontal rules as a less intense pause than a section break. Others might want every HR to designate a new section. Still others might not care about HRs at all, but simply want a way to manually split sections *without* a corresponding H2 or new-thought.

  Perhaps choose *one* of the three possible markers (`*` `-` `_`) to be an "invisible" break, replaced with simply a `</section><section>`.

  Note that, in doing so, we will also need to strip out empty (consecutive) sections created by e.g. a `***` followed by an second-level heading.

  Given the varying potential opinions on such a feature, and the relatively minor visual impact regardless, implementing this enhancement is not a high priority.

### Known Bugs

- None at this time

### Chores

To-do items that are not features or functional changes.

- [x] Add a [CHANGELOG](https://keepachangelog.com/en/1.1.0/)
- [x] Update demo site to use Tufte CSS submodule: perhaps needs an iframe so that `<body>` tag is present?
- [x] Add an installation & usage guide to the README
- [x] Add examples of "extra" CSS that can be used alongside `tufte.css` and this plugin to enhance final result
  - [x] Header link buttons
  - [x] Improved `figcaption` styling
    - [x] Submit this as a PR to the official Tufte CSS repo (started the conversation in [this issue thread](https://github.com/edwardtufte/tufte-css/issues/44#issuecomment-2610993016))

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
    npm version [patch|minor|major] -m "My release notes"
    ```

- Push the commit and tag to Github:

    ```
    git push --follow-tags
    ```

- Publish to the NPM registry (this will run the build task automatically beforehand):

    ```
    npm publish
    ```
