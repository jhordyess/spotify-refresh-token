#? Command history

yarn init -y

yarn add express node-fetch querystring

yarn add -D @types/express typescript
yarn add -D ts-loader webpack webpack-cli webpack-node-externals nodemon-webpack-plugin dotenv-webpack
yarn add -D prettier && touch .prettierrc && yarn prettier --write .
yarn add -D eslint && yarn eslint --init