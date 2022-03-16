const vscode = require('vscode');

function getSelected(editor) {
  if (editor.selection.isEmpty) {
    const line = editor.document.lineAt(editor.selection.start.line);
    return {
      text: line.text,
      range: line.range,
    }
  }

  const text = editor.document
    .getText(new vscode.Range(editor.selection.start, editor.selection.end))
    .replace(/\n/g, "");
  
  return {
    text,
    range: editor.selection,
  }
}

module.exports = {
  getSelected,
};