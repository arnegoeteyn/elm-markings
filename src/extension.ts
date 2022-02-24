// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(
        {language: "elm"}, new FooDocumentSymbolProvider()
    ));
}

class FooDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    public provideDocumentSymbols(document: vscode.TextDocument,
            token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
        return new Promise((resolve, reject) => {
            var symbols = [];

            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);
                if (line.text.includes("--|")) {
                    symbols.push(new vscode.SymbolInformation(
                         line.text.substring(3),
                         vscode.SymbolKind.Field,
						 "",
                        new vscode.Location(document.uri, line.range)
                    ));
                }
            }

            resolve(symbols);
        });
    }
}

// this method is called when your extension is deactivated
export function deactivate() {}
