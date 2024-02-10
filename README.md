# Spotify Refresh Token

Simple Web App for obtaining Spotify Refresh Token.

## Description

Web App that allows users to obtain Spotify Refresh Token selecting the scopes that they need. The app follow the Spotify official documentation to get the refresh token for the Web API, uses the [authorization code flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow).

### Technologies Used

- Node modules: [Express](https://expressjs.com/), [Pug](https://pugjs.org/)
- Programming Language: [TypeScript](https://www.typescriptlang.org/)
- Build Tool: [Webpack](https://webpack.js.org/)
- Dev Environment: [VSCode](https://code.visualstudio.com/) with [dev containers](https://code.visualstudio.com/docs/devcontainers/containers) in [Zorin OS](https://zorinos.com/)

## How to use

1. Clone the repository:

```bash
git clone git@github.com:jhordyess/spotify-refresh-token.git
```

2. Open the project folder:

```bash
cd spotify-refresh-token
```

3. Create a `.env` file in the root folder by copying the example from the `.env.example` file. And replace the values with your own.

5. Install the dependencies:

```bash
yarn
```

6. Run the project:

```bash
yarn dev
```

7. Open in the browser at: <http://localhost:3000> and test the app.

## How to use with Docker

You can use the VSCode dev containers to run the project in a containerized environment.

You need to have installed [Docker](https://www.docker.com/) and [VSCode](https://code.visualstudio.com/), and the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

1. Clone the repository:

```bash
git clone git@github.com:jhordyess/spotify-refresh-token.git
```

2. Open the project with VSCode:

```bash
code spotify-refresh-token
```

3. Create a `.env` file in the root folder by copying the example from the `.env.example` file. And replace the values with your own.

4. Open the command palette and select the option `Dev Containers: Reopen in Container`.

5. Wait for the container to be built and the project to be started.

6. Open the terminal in VSCode and run the project:

```bash
yarn dev
```

7. Open in the browser at: <http://localhost:3000> and test the app.

## Contribution

If you would like to contribute to the project, open an issue or make a pull request on the repository.

## License

© 2023> [Jhordyess](https://github.com/jhordyess). Under the [MIT](https://choosealicense.com/licenses/mit/) license. See the [LICENSE](./LICENSE) file for more details.

---

Made with 💪 by [Jhordyess](https://www.jhordyess.com/)