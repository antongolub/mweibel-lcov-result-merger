

## [5.0.0-rc.0](https://github.com/mweibel/lcov-result-merger/compare/v4.1.0...v5.0.0-rc.0) (2023-07-06)


### ⚠ BREAKING CHANGES

* shift internals from Streams to Promises
* use host system temp directory for transient lcov.info file

### Features

* use host system temp directory for transient lcov.info file ([3c713f1](https://github.com/mweibel/lcov-result-merger/commit/3c713f1be01f6c080cc2c0db7b75ea21eb4e0253))


### Bug Fixes

* subclass stream Transform since node 14 simplified construction does not offer "construct" ([d9c14b6](https://github.com/mweibel/lcov-result-merger/commit/d9c14b6dc5f043499e4f8669a754e6877ebd27df))


### Code Refactoring

* shift internals from Streams to Promises ([0cbfa42](https://github.com/mweibel/lcov-result-merger/commit/0cbfa42cf860a9a7138d9b1febc20ee1c1c67651))