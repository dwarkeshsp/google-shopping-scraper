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
  let titles = await page.evaluate(() => {
    let data = [];
    let elements = document.getElementsByClassName("xsRiS");
    for (var element of elements) data.push(element.textContent);
    return data;
  });
  if (titles.length == 0) {
    console.log("inside");
    titles = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName("A2sOrd");
      for (var element of elements) data.push(element.textContent);
      return data;
    });
  }
  let prices = await page.evaluate(() => {
    let data = [];
    let elements = document.getElementsByClassName("Nr22bf");
    for (var element of elements) data.push(element.textContent);
    return data;
  });
  data = titles.map((title, index) => [
    title,
    parseInt(prices[index].substring(1)),
  ]);
  console.log(data);

  browser.close();
}
