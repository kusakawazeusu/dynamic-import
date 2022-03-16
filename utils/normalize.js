function normalizePackageNames(packageNames, tabSize = 2) {
	let names = packageNames.trim();
	if (!names.startsWith("{") && !names.endsWith("}")) {
		return names;
	}

	names = names
		.slice(1, names.length - 1)
		.split(",")
		.filter(name => name)
		.map(name => " ".repeat(tabSize) + name.trim())
		.join(",\n");

	return `{\n${names},\n}`;
}

module.exports = {
  normalizePackageNames,
};