import { window, commands, workspace, StatusBarAlignment, ExtensionContext, ProgressLocation } from 'vscode';
import upload from './lib/upload';

import * as clipboardy from 'clipboardy';
import getKeyWithExtension from './lib/getKeyWithExtension';

const activate = (context: ExtensionContext) => {
	const uploadCommand = 'vsc-fastbin.upload';

	const uploadStatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
	uploadStatusBarItem.text = '$(cloud-upload) Upload to fastbin';

	let currentlyUploading = false;

	context.subscriptions.push(commands.registerCommand(uploadCommand, async () => {
		if (currentlyUploading) {
			return;
		}

		if (!window.activeTextEditor) {
			window.showInformationMessage('There\'s nothing to upload! Please open a document first.');
			return;
		}

		currentlyUploading = true;
		uploadStatusBarItem.text = '$(loading~spin) Uploading snippet...';

		let baseUrl = workspace.getConfiguration().get<string>('vsc-fastbin.apiUrl');
		if (!baseUrl) {
			baseUrl = 'https://fastbin.xyz';
		}

		const contents = window.activeTextEditor.document.getText();

		try {
			const key = await upload(baseUrl, contents);
			const keyWithExtension = getKeyWithExtension(key, window.activeTextEditor.document.languageId);

			await clipboardy.write(`${baseUrl}/${keyWithExtension}`);

			window.showInformationMessage(
				'Snippet uploaded successfully and URL copied to clipboad!',
				'Copy snippet URL',
				'Copy raw URL'
			)
				.then(async value => {
					switch (value) {
						case 'Copy snippet URL':
							await clipboardy.write(`${baseUrl}/${keyWithExtension}`);
							break;
						case 'Copy raw URL':
							await clipboardy.write(`${baseUrl}/raw/${key}`);
							break;
					}
				});
		} catch (err) {
			window.showErrorMessage(`Failed to upload snippet. Error: ${err}`);
		} finally {
			currentlyUploading = false;
			uploadStatusBarItem.text = '$(cloud-upload) Upload to fastbin';
		}
	}));

	uploadStatusBarItem.command = uploadCommand;

	context.subscriptions.push(uploadStatusBarItem);

	if (window.activeTextEditor) {
		uploadStatusBarItem.show();
	}

	context.subscriptions.push(window.onDidChangeActiveTextEditor(() => {
		if (window.activeTextEditor) {
			uploadStatusBarItem.show();
		} else {
			uploadStatusBarItem.hide();
		}
	}));
};

export {
	activate
};
