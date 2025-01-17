# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing here yet!

## [0.1.0] - 2025-01-13

**Initial release!** :tada:

### Added

- Side notes: `[^ref]` in the text with `[^ref]: contents of note` somewhere else in the Markdown.
- Inline side notes: `^[contents of note]` in the text.
- Margin notes: `[^ref]: {-} contents of note` or `^[{-} contents of note]`. Same as side note, but omits the reference number.
- New-thought markers: `^^Happy families are all alike;^^ every unhappy family is unhappy in its own way.` Renders the text surrounded by `^^` in small caps.
- Automatic `<section>` breaks:
  - Entire text will be surrounded by at least one `<section>`
  - Each second-level heading will trigger a section split immediately above it
  - Each paragraph starting with a new-thought will trigger a section split immediately above it

[unreleased]: https://github.com/neillrobson/markdown-it-tufte/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/neillrobson/markdown-it-tufte/releases/tag/v0.1.0
