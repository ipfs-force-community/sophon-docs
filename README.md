# Sophon Docs

This repository contains documentation content for the [Sophon](https://github.com/filecoin-project/venus). It is hosted at **[sophon.venus-fil.io](https://sophon.venus-fil.io)**. For mandarin speakers, please visit [https://sophon.venus-fil.io/zh/](https://sophon.venus-fil.io/zh/). 

## Contributing

PRs, bug reports, and issue suggestions are welcome! For major changes, please propose in an issue first so benefits and impacts can be discussed.

👉 You can also click on click on :pencil: `Suggest an Edit` links at the bottom of each page to jump directly to Edit mode.

## Deployment

### Running locally:

```
  $ yarn install
  $ yarn docs:dev 
```

### Building:

```
  $ yarn docs:links   # verify all links are well-formed
  $ yarn docs:build
```

Then deploy the `docs/.vuepress/dist` directory to the `gh-pages` branch of this repo.

### Notes:

- When new documentation pages are added `./docs/.vuepress/config.js` will need to be **manually updated** in this repo

## Licenses

The Filecoin Project's software code is dual-licensed under Apache 2.0 and MIT terms:

- Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT License ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

Documentation and other written content is copyright (c) Protocol Labs under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) license.

See the [LICENSE.md](LICENSE.md) file for details.


