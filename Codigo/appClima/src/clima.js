const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function scrapeWeather(city) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.google.com/search?q=clima+${encodeURIComponent(city)}`;
    await page.goto(url);

    const temperature = await page.$eval('#wob_tm', element => element.textContent);
    const rainProbability = await page.$eval('#wob_pp', element => element.textContent);
    const humidity = await page.$eval('#wob_hm', element => element.textContent);
    const windSpeed = await page.$eval('#wob_ws', element => element.textContent);
    const weatherDescription = await page.$eval('#wob_dc', element => element.textContent);

    console.log(`Cidade: ${city}`);
    console.log(`Temperatura: ${temperature}°C`);
    console.log(`Probabilidade de Chuva: ${rainProbability}`);
    console.log(`Umidade: ${humidity}`);
    console.log(`Velocidade do Vento: ${windSpeed}`);
    console.log(`Descrição do Clima: ${weatherDescription}`);

    await browser.close();
}

rl.question('Qual cidade? ', async (city) => {
    await scrapeWeather(city);
    rl.close();
});
