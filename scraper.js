const puppeteer = require("puppeteer");

query = "";
for (let i = 2; i < process.argv.length; i++) query += process.argv[i] + " ";
console.log(query);

url = "https://www.google.com/search?tbm=shop&q=" + query.replace(" ", "%20");
scrapeProduct(url);

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let texts = await page.evaluate(() => {
    let data = [];
    let elements = document.getElementsByClassName("Nr22bf");
    for (var element of elements) data.push(element.textContent);
    return data;
  });
  console.log(texts);
  browser.close();
}
