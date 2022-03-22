const puppeteer = require('puppeteer');
const GPU = require('./models/gpu');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/f5-standingby", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database connected!"))
.catch(err => {
  console.log("Error with connecting to mongodb " + err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});




async function scrapeASUS3080(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[2]/div/img'); //Image URL
    const src = await el.getProperty('src');
    const imageURL =  await src.jsonValue();

    const [el2] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name
    
    const txt = await el2.getProperty('textContent');
    const title =  await txt.jsonValue();
    
    const [el3] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[3]/div[4]/ul/li[3]/strong'); //Price
    const txt2 = await el3.getProperty('textContent');
    const price =  await txt2.jsonValue();      

    
    
    const newGraphicsCard = await new GPU({ title: title, imageURL: imageURL, price: price});
    console.log(newGraphicsCard);
    await newGraphicsCard.save().catch(err => console.log("Error saving newProduct = " + err));
    //console.log({title, imageURL, price});
    browser.close();

  


};

async function scrapeMSI3070(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[2]/div/img'); //Image URL
    const src = await el.getProperty('src');
    const imageURL =  await src.jsonValue();

    const [el2] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name
    const txt = await el2.getProperty('textContent');
    const title =  await txt.jsonValue();
    
    const [el3] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[2]/div[4]/ul/li[3]/strong'); //Price
    const txt2 = await el3.getProperty('textContent');
    const price =  await txt2.jsonValue();    

    
    const newGraphicsCard = await new GPU({ title: title, imageURL: imageURL, price: price});
    console.log(newGraphicsCard);
    await newGraphicsCard.save().catch(err => console.log("Error saving newProduct = " + err));
    //console.log({title, imageURL, price});
    browser.close();

};

async function scrapeGigaByte3060(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[2]/div/img'); //Image URL
    const src = await el.getProperty('src');
    const imageURL =  await src.jsonValue();

    const [el2] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name    
    const txt = await el2.getProperty('textContent');
    const title =  await txt.jsonValue();
    
    const [el3] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[2]/div[3]/ul/li[3]/strong'); //Price
    const txt2 = await el3.getProperty('textContent');
    const price =  await txt2.jsonValue();       
    
    const newGraphicsCard = await new GPU({ title: title, imageURL: imageURL, price: price});
    console.log(newGraphicsCard);
    await newGraphicsCard.save().catch(err => console.log("Error saving newProduct = " + err));
    //console.log({title, imageURL, price});
    browser.close();

};



scrapeASUS3080('https://www.newegg.com/asus-geforce-rtx-3080-tuf-rtx3080-o10g-v2-gaming/p/N82E16814126525?Description=3080&cm_re=3080-_-14-126-525-_-Product&quicklink=true');
scrapeMSI3070('https://www.newegg.com/msi-geforce-rtx-3070-rtx-3070-ventus-2x-8g-oc-lhr/p/N82E16814137671?Description=3070&cm_re=3070-_-14-137-671-_-Product&quicklink=true');
scrapeGigaByte3060('https://www.newegg.com/gigabyte-geforce-rtx-3060-gv-n3060gaming-oc-12gd/p/N82E16814932402?Description=3060&cm_re=3060-_-14-932-402-_-Product&quicklink=true');

//mongoose.connection.close();
