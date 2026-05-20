/**
 * NixOS noexec workaround: home partition disallows executing binaries or
 * dlopen-ing .node files. Copy them to /tmp before use.
 */
const { copyFileSync, chmodSync, existsSync } = require('fs');
const { tmpdir } = require('os');
const { basename, resolve } = require('path');

// Copy esbuild binary to /tmp so it can be spawned from a non-noexec path.
const esbuildSrc = resolve(__dirname, '../node_modules/@esbuild/linux-x64/bin/esbuild');
if (existsSync(esbuildSrc)) {
  const esbuildTmp = `${tmpdir()}/esbuild.${process.pid}`;
  copyFileSync(esbuildSrc, esbuildTmp);
  chmodSync(esbuildTmp, 0o755);
  process.env.ESBUILD_BINARY_PATH = esbuildTmp;
}

const _dlopen = process.dlopen.bind(process);
process.dlopen = function (module, filename, flags) {
  if (!filename.endsWith('.node')) {
    return flags !== undefined ? _dlopen(module, filename, flags) : _dlopen(module, filename);
  }

  const tmp = `${tmpdir()}/${basename(filename)}.${process.pid}.node`;
  copyFileSync(filename, tmp);
  return flags !== undefined ? _dlopen(module, tmp, flags) : _dlopen(module, tmp);
};
