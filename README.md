# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Troubleshooting: "Workspaces not supported for global packages"

You may see an error like:

"Workspaces not supported for global packages"

This happens when you run a global `npm install -g ...` (or other global npm operation) from inside a folder that npm detects as a workspace root. npm refuses global installs from workspace roots to avoid corrupting monorepos.

Quick fixes:

- Install the tool from outside any workspace root. In PowerShell, for example:

```powershell
cd ~
npm install -g <package-name>
```

- Use `npx` (runs without installing globally) or `npm exec`:

```powershell
npx <package-name> [args...]
# or
npm exec --package=<package-name> <command> [args...]
```

- Install locally as a dev dependency and run via `npx` or an npm script:

```powershell
npm install --save-dev <package-name>
npm run <script-that-uses-the-package>
```

Helper script (Windows PowerShell)
If you really need a global install and prefer a one-step helper, there's a small PowerShell helper that temporarily changes to a safe temp directory and runs the global install there so npm won't detect your workspace root. Run it from the project root like this:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-global.ps1 <package-name>
```

You can also inspect the npm debug log referenced in the error to see the exact working directory npm used. The log path is usually printed by npm (for example: `C:\Users\<you>\AppData\Local\npm-cache\_logs\<timestamp>-debug-0.log`). Open that file in a text editor to confirm where npm ran.

Find the workspace root (optional)
If you want to find which parent folder has a `package.json` that defines `workspaces`, run this in PowerShell from the directory where you ran the failing command:

```powershell
$pwd = (Get-Location).Path
while ($pwd) {
	$p = Join-Path $pwd 'package.json'
	if (Test-Path $p) {
		if (Select-String -Path $p -Pattern '"workspaces"' -SimpleMatch -Quiet) {
			Write-Output "Found workspaces in: $p"
			break
		}
	}
	$parent = Split-Path $pwd -Parent
	if ($parent -eq $pwd) { break }
	$pwd = $parent
}
```

If you want me to inspect the npm debug log or add a script entry to `package.json` that uses a specific package locally (so you don't need global installs), tell me which package you were trying to install and I will add the recommended changes.
