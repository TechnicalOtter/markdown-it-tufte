# Markdown-It Tufte

[![ci-badge]][ci-link]
[![npm-badge]][npm-link]

> A markdown-it plugin for creating documents compatible with Tufte CSS.

[ci-badge]: https://github.com/neillrobson/markdown-it-tufte/workflows/CI/badge.svg
[ci-link]: https://github.com/neillrobson/markdown-it-tufte/actions
[npm-badge]: https://img.shields.io/npm/v/markdown-it-tufte.svg
[npm-link]: https://www.npmjs.com/package/markdown-it-tufte

## Pre-1.0.0 Package

Much of the syntax and structure is still subject to change, as I learn how to create a robust Markdown-It plugin!

## To-Do List

- [x] Complete side-note/margin-note implementation (specifically, the `{-}` prefix)
- [x] Automatically split `<section>`s, based on `newthought`s and `h2`s
- [x] Change `newthought` to requiring a double caret `^^` delimiter (maybe?)

Most likely, once the above items are complete, we'll do the first NPM-published package.
There are plenty of "post-release" items to consider though:

- [x] Syntax for `<figure>`s
- [ ] Epigraph-style block quotes, and `<footer>` citations
- [x] "Slug IDs" for sections (both header and newthought-based), for easy linking
- [ ] Brainstorm: `<section>` splitting on `<hr>`.

    Should it be done automatically? Perhaps choose one of the three possible markers (`*` `-` `_`) to be an "invisible" break, replaced with simply a `</section><section>`.

    Note that, in doing so, we will also need to strip out empty (consecutive) sections created by e.g. a `***` followed by an second-level heading.

### Chores

To-do items that are not features or functional changes.

- [x] Add a [CHANGELOG](https://keepachangelog.com/en/1.1.0/)
- [x] Update demo site to use Tufte CSS submodule: perhaps needs an iframe so that `<body>` tag is present?

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
