const vscode = require('vscode');
const { normalizePackageNames } = require("./utils/normalize");
const {
	staticToDynamicImport,
	dynamicToStaticImport,
} = require("./utils/convert");
const { getSelected } = require("./utils/editor");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let convert = vscode.commands.registerCommand('dynamic-import.convert', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		
		const staticImportSyntax = /^import\s(.+)\sfrom\s["'](.+)['"]/g;
		const dynamicImportSyntax = /^const\s(.+)\s=\sdynamic\(import\(["'](.+)["']\)\)/g;

		const { text: selectedText, range: selectedRange } = getSelected(editor);
		const isSemiColonExists = selectedText.includes(";") ? ";" : "";
		const quote = selectedText.includes("\"") ? "\"" : "'";

		let convertFunction = staticToDynamicImport;
		
		let parsedResult = staticImportSyntax.exec(selectedText);
		if (!parsedResult) {
			parsedResult = dynamicImportSyntax.exec(selectedText);
			if (!parsedResult) {
				return console.error("no import statement found.")
			}

			convertFunction = dynamicToStaticImport;
		}

		const [, packageNames, source] = parsedResult;
		
		const replacingStatement = convertFunction(
			normalizePackageNames(packageNames, editor.options.tabSize),
			source,
			{
				quote,
				semiColon: isSemiColonExists
			},
		);

		editor.edit(builder => {
			builder.replace(
				selectedRange,
				replacingStatement,
			)
		});
	});

	context.subscriptions.push(convert);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
