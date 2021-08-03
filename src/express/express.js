'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const DEFAULT_PORT = 8080;

const app = express();

app.get(`/`, (req, res) => res.send(`/`));
app.listen(DEFAULT_PORT, () => console.log(chalk.blue(`Сервер запущен на порту ${DEFAULT_PORT}`)));
