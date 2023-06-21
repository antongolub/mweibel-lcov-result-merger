/* eslint-env mocha */

const fg = require('fast-glob');
const fs = require('fs');
const chai = require('chai');
const lcovResultMerger = require('../index.js');

chai.should();

describe('lcovResultMerger', function () {
  it('should combine the given records into one', async function () {
    const expected = fs.readFileSync('./test/expected/basic/lcov.info', 'utf8');
    let tmpFilePath = '';

    await new Promise((res) => {
      fg.stream('./test/fixtures/basic/*/lcov.info')
        .pipe(lcovResultMerger())
        .on('data', (tmpFile) => {
          tmpFilePath = tmpFile;
        })
        .on('end', res);
    });

    const actual = fs.readFileSync(tmpFilePath, 'utf8');
    return actual.should.equal(expected);
  });

  it('should ignore null files', function (callback) {
    const stream = lcovResultMerger();
    stream.on('data', function (file) {
      const fileContentStr = fs.readFileSync(file, 'utf8');
      fileContentStr.should.equal('');
      callback();
    });
    stream.write({
      cwd: './',
      path: '/meow.html',
    });
    stream._flush();
  });

  it('should handle a record with : in the name', async function () {
    const expected = fs.readFileSync(
      './test/expected/windows/lcov.info',
      'utf8'
    );
    let tmpFilePath = '';

    await new Promise((res) => {
      fg.stream('./test/fixtures/windows/lcov.info')
        .pipe(lcovResultMerger())
        .on('data', (tmpFile) => {
          tmpFilePath = tmpFile;
        })
        .on('end', res);
    });
    const actual = fs.readFileSync(tmpFilePath, 'utf8');
    return actual.should.equal(expected);
  });

  it('should optionally prepend source file lines', async function () {
    const expected = fs.readFileSync(
      './test/expected/prepended/lcov.info',
      'utf8'
    );

    let tmpFilePath = '';

    await new Promise((res) => {
      fg.stream('./test/fixtures/basic/*/lcov.info')
        .pipe(
          lcovResultMerger({
            'prepend-source-files': true,
            'prepend-path-fix': '',
          })
        )
        .on('data', (tmpFile) => {
          tmpFilePath = tmpFile;
        })
        .on('end', res);
    });
    const actual = fs.readFileSync(tmpFilePath, 'utf8');
    return actual.should.equal(expected);
  });

  it('should optionally prepend source file lines with corrected pathing', async function () {
    const expected = fs.readFileSync(
      './test/expected/prepended-path-fix/lcov.info',
      'utf8'
    );

    let tmpFilePath = '';

    await new Promise((res) => {
      fg.stream('./test/fixtures/coverage-subfolder/*/coverage/lcov.info')
        .pipe(lcovResultMerger({ 'prepend-source-files': true }))
        .on('data', (tmpFile) => {
          tmpFilePath = tmpFile;
        })
        .on('end', res);
    });
    const actual = fs.readFileSync(tmpFilePath, 'utf8');
    return actual.should.equal(expected);
  });
});
