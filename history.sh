#? Command history

yarn init -y && npm pkg delete scripts.test

yarn add express pug morgan express-validator

yarn add -D typescript ts-loader @types/node @types/express @types/pug @types/morgan
yarn add -D webpack webpack-cli webpack-node-externals nodemon-webpack-plugin dotenv-webpack

yarn add -D prettier && touch .prettierrc && yarn prettier --write .
yarn add -D eslint && yarn eslint --init
yarn add -D husky && yarn husky install && yarn husky add .husky/pre-commit "yarn lint"
