import { Browser, launch, Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

type CardData = {
  id: string;
  name: string;
  type: string;
  image: string;
  club: string;
  position: string;
};

let browser: Browser;

const STARTING_PAGE =
  'https://www.corinthianseller.co.uk/adrenalyn-xl-premier-league-2024-cards-limited-edition.php';

const logger = (...msg: unknown[]) => {
  console.log(...msg);
};

const openPage = async (url: string): Promise<Page> => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(url);
  return page;
};

const downloadImage = async (url: string, id: string) => {
  const relativePath = `assets/cards/${id}.png`;
  const imagePath = path.resolve(path.join(__dirname, '..', relativePath));
  const file = fs.createWriteStream(imagePath);

  return new Promise<string>((res, rej) => {
    https
      .get(url, (response) => {
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`Image downloaded as ${imagePath}`);
          res(relativePath);
        });
      })
      .on('error', (err) => {
        fs.unlink(imagePath, (unlinkErr) => {
          rej(unlinkErr);
        });
        console.error(`Error downloading image: ${err.message}`);
        rej(err);
      });
  });
};

const getCardsFromPage = async (url: string): Promise<CardData[]> => {
  logger(`Opening ${url}`);
  const page = await openPage(url);

  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('table.cards'), (el) => {
      const rows = el.querySelectorAll('tr');
      const type =
        el.querySelector<HTMLTableCellElement>('.cardtype')?.innerText ??
        'Standard';
      const headers = el.querySelectorAll('th');
      const name = headers[0].innerText;
      const image = el.querySelector('img')?.src ?? '';
      const club = rows[type !== 'Standard' ? 2 : 1].innerText.replace(
        / \w+$/,
        ''
      );
      const position = rows[type !== 'Standard' ? 2 : 1].innerText.includes(
        'Defender'
      )
        ? 'Defender'
        : rows[type !== 'Standard' ? 2 : 1].innerText.includes('Midfielder')
        ? 'Midfielder'
        : 'Forward';
      const id = rows[type !== 'Standard' ? 4 : 3].innerText
        .split(':')[1]
        ?.trim();
      return {
        id,
        name,
        type,
        image,
        club,
        position,
      };
    });
  });
};

const downloadImagesFromPage = async (pageUrl: string) => {
  const cards = await getCardsFromPage(pageUrl);

  for (const card of cards) {
    if (!card.id || !card.name || !card.club || !card.image || !card.position) {
      logger('Missing data');
      logger(card);
      break;
    }
    card.image = await downloadImage(card.image, card.id);
  }

  return cards;
};

const getPages = async () => {
  // navigate to starting page
  logger(`Getting pages`);
  const page = await openPage(STARTING_PAGE);
  const pages = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.miniatures > a'),
      (a) => a.href
    ).filter((page) => page.includes('adrenalyn-xl-premier-league-2024-cards-'))
  );
  logger(`Found ${pages.length} pages`);
  return pages;
};

const run = async () => {
  browser = await launch({
    headless: 'new',
  });

  const pages = await getPages();
  const allCards: CardData[] = [];

  for (const page of pages) {
    const pageCards = await downloadImagesFromPage(page);
    for (const pageCard of pageCards) {
      if (!allCards.find((c) => c.id === pageCard.id)) {
        allCards.push(pageCard);
      }
    }
  }

  // await downloadImagesFromPage(
  //   'https://www.corinthianseller.co.uk/adrenalyn-xl-premier-league-2024-cards-brentford.php'
  // );

  // console.log(allCards);
  fs.writeFileSync(
    path.resolve(path.join(__dirname, '..', 'src/data/cards.ts')),
    JSON.stringify(allCards, null, 2)
  );

  const images: { [key: string]: string } = {};
  for (const card of allCards) {
    images[card.id] = `require("../../${card.image}")`;
  }
  fs.writeFileSync(
    path.resolve(path.join(__dirname, '..', 'src/data/card-images.ts')),
    JSON.stringify(images, null, 2)
  );

  await browser.close();
};

run();
