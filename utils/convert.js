function staticToDynamicImport(
  packageNames,
  source,
  options = {
    semiColon: false,
    quote: "'",
  }) {
  return `const ${packageNames} = dynamic(import(${options.quote}${source}${options.quote}))${options.semiColon}`;
}

function dynamicToStaticImport(
  packageNames,
  source,
  options = {
    semiColon: false,
    quote: "'",
  }) {
  return `import ${packageNames} from ${options.quote}${source}${options.quote}${options.semiColon}`;
}

module.exports = {
  staticToDynamicImport,
  dynamicToStaticImport,
}