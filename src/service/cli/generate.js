'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const MAX_ID_LENGTH = 6;
const MAX_COMMENTS = 7;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const DataFileUrl = {
  TITLES: `./src/data/titles.txt`,
  SENTENCES: `./src/data/sentences.txt`,
  CATEGORIES: `./src/data/categories.txt`,
  COMMENTS: `./src/data/comments.txt`,
};

const getPictureFileName = (pictureNumber) => `item${pictureNumber.toString().padStart(2, 0)}.jpg`;

const getRandomArrayItem = (array) => array[getRandomInt(0, array.length - 1)];
/**
 * Возвращает указанное количество элементов массива взятых случайно
 * @param {Array} array
 * @param {number} itemsNumber
 * @return {Array}
 */
const getRandomItemsFromArray = (array, itemsNumber) => shuffle(array).slice(0, itemsNumber);

const getStringArrayFromFile = async (filePath) => {
  let data = [];

  try {
    data = (await fs.readFile(filePath, `utf-8`)).split(`\n`);
  } catch (error) {
    console.error(chalk.red(`Ошибка чтения файла ${filePath}\n${error}`));
    process.exit(ExitCode.ERROR);
  }

  return data;
};

const generateComments = (comments, count) => Array(count).fill({}).map(() => ({
  id: nanoid(MAX_ID_LENGTH),
  text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
}));

const generateOffers = async (count) => {
  if (count > MAX_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
    process.exit(ExitCode.ERROR);
  }

  const [categories, sentences, titles, comments] = await Promise.all([
    getStringArrayFromFile(DataFileUrl.CATEGORIES),
    getStringArrayFromFile(DataFileUrl.SENTENCES),
    getStringArrayFromFile(DataFileUrl.TITLES),
    getStringArrayFromFile(DataFileUrl.COMMENTS),
  ]);

  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: getRandomItemsFromArray(categories, getRandomInt(1, categories.length - 1)),
    description: getRandomItemsFromArray(sentences, getRandomInt(1, 5)).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: getRandomArrayItem(titles),
    type: getRandomArrayItem(Object.values(OfferType)),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(comments, getRandomInt(1, MAX_COMMENTS)),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    try {
      const content = await generateOffers(countOffer);
      await fs.writeFile(FILE_NAME, JSON.stringify(content));
      console.info(chalk.green(`Успех: mock-файл с тестовыми объявлениями создан!`));
    } catch (error) {
      console.error(chalk.red(`Не удалось создать файл!\nОшибка: ${error}`));
      process.exit(ExitCode.ERROR);
    }
  }
};
