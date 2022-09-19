// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

const isWindows = (process.platform === "win32");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cdtoactivefiledir-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cdtoactivefiledir-vscode.cdtoactivefiledir', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from CdToActiveFileDir-VScode!');
		var currentConfig = vscode.workspace.getConfiguration();
		var terminalToUse = currentConfig.get("changeTerminalOnWorkspace.terminalToUse");

		if (!vscode.window.activeTextEditor) {
			return; // no editor
		}
		else {
			const { document } = vscode.window.activeTextEditor;
			const foldPath = path.dirname(document.uri.path);
			const command = getCDCommand(foldPath);

			vscode.window.terminals[0].sendText(command);
			vscode.window.showInformationMessage(command);
		}
	});

	context.subscriptions.push(disposable);
}

function getCDCommand(folder: string): string {
	var command;
	if (isWindows) {
		command = 'cd /d "' + folder + '"';
	} else {
		command = 'cd "' + folder + '"';
	}
	return command;
}

// this method is called when your extension is deactivated
export function deactivate() { }

