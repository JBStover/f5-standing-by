//const puppeteer = require('puppeteer');
const GPU = require('../models/gpu');
const Console = require('../models/console');
const User = require('../models/user');


const router = require("express").Router();


router.get("/scrapeGPUs/", async (req, res, next) => {
    const urlFor3080 = 'https://www.newegg.com/asus-geforce-rtx-3080-tuf-rtx3080-o10g-v2-gaming/p/N82E16814126525?Description=3080&cm_re=3080-_-14-126-525-_-Product&quicklink=true';
    const urlFor3070 = 'https://www.newegg.com/msi-geforce-rtx-3070-rtx-3070-ventus-2x-8g-oc-lhr/p/N82E16814137671?Description=3070&cm_re=3070-_-14-137-671-_-Product&quicklink=true';
    const urlFor3060 = 'https://www.newegg.com/gigabyte-geforce-rtx-3060-gv-n3060gaming-oc-12gd/p/N82E16814932402?Description=3060&cm_re=3060-_-14-932-402-_-Product&quicklink=true';

    const scrapedData = [];

    const browser = await puppeteer.launch();  // Launch browswer
    const page = await browser.newPage(); // Open new page
    await page.goto(urlFor3080);  // Open URL for Newegg 3080

    const [el] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[2]/div/img'); //Image URL
    const src = await el.getProperty('src');
    const imageURL =  await src.jsonValue();

    const [el2] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name    
    const txt = await el2.getProperty('textContent');
    const title =  await txt.jsonValue();
    
    const [el3] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[2]/div[4]/ul/li[3]/strong'); //Price
    const txt2 = await el3.getProperty('textContent');
    const price =  await txt2.jsonValue();      
    
    const newGraphicsCard1 = await new GPU({ title: title, imageURL: imageURL, price: price});
    scrapedData.push(newGraphicsCard1);
    await newGraphicsCard1.save().catch(err => console.log("Error saving newProduct = " + err));
    
         
    
    await page.goto(urlFor3070); // Open URL for Newegg 3070
    
    const [el4] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[2]/div/img'); //Image URL
    const src3070 = await el4.getProperty('src');
    const imageURL3070 =  await src3070.jsonValue();

    const [el5] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name
    const txt3070Name = await el5.getProperty('textContent');
    const title3070 =  await txt3070Name.jsonValue();
    
    const [el6] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[3]/div[4]/ul/li[3]/strong'); //Price
    const txt3070Price = await el6.getProperty('textContent');
    const price3070 =  await txt3070Price.jsonValue();    

    
    const newGraphicsCard2 = await new GPU({ title: title3070, imageURL: imageURL3070, price: price3070});
    scrapedData.push(newGraphicsCard2);
    await newGraphicsCard2.save().catch(err => console.log("Error saving newProduct = " + err));    
    
    await page.goto(urlFor3060);  // Open URL for Newegg 3060

    const [el7] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[2]/div/img'); //Image URL
    const src3060 = await el7.getProperty('src');
    const imageURL3060 =  await src3060.jsonValue();

    const [el8] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name    
    const txt3060Name = await el8.getProperty('textContent');
    const title3060 =  await txt3060Name.jsonValue();
    
    const [el9] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[2]/div[3]/ul/li[3]/strong'); //Price
    const txt3060Price = await el9.getProperty('textContent');
    const price3060 =  await txt3060Price.jsonValue();       
    
    const newGraphicsCard3 = await new GPU({ title: title3060, imageURL: imageURL3060, price: price3060});
    scrapedData.push(newGraphicsCard3);
    await newGraphicsCard3.save().catch(err => console.log("Error saving newProduct = " + err));    
    
    browser.close();
    res.send(scrapedData);
});

router.get("/scrapeConsoles/", async (req, res, next) => {
    const urlPS5Disc = 'https://www.newegg.com/p/N82E16868110294?Description=playstation%205&cm_re=playstation_5-_-68-110-294-_-Product&quicklink=true';
    const urlPS5Digital = 'https://www.newegg.com/sony-ps5-digital-white/p/2SH-000D-002K1?Description=playstation%205&cm_re=playstation_5-_-2SH-000D-002K1-_-Product';
    const urlXboxSeriesX = 'https://www.newegg.com/p/2WK-0004-002X8?Description=xbox%20series%20x&cm_re=xbox_series%20x-_-2WK-0004-002X8-_-Product&quicklink=true';
    const urlXboxSeriesS = 'https://www.newegg.com/p/N82E16868105274';
    
    const scrapedConsoles = [];

    // Scrape PS5 Disc Drive Edition
    const browser = await puppeteer.launch();  // Launch browswer
    const page = await browser.newPage(); // Open new page
    await page.goto(urlPS5Disc);  // Open URL for Newegg 3080

    const [el] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[2]/div/img'); //Image URL for PS5 with Disc drive
    const src = await el.getProperty('src');
    const imageURLPS5Disc =  await src.jsonValue();

    const [el2] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name for PS5 with Disc drive
    const txt = await el2.getProperty('textContent');
    const titlePS5Disc =  await txt.jsonValue();
    
    const [el3] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[2]/div[3]/ul/li[3]/strong'); //Price for PS5 with Disc drive
    const txt2 = await el3.getProperty('textContent');
    const pricePS5Disc =  await txt2.jsonValue();      
    
    const newConsole1 = await new Console({ title: titlePS5Disc, imageURL: imageURLPS5Disc, price: pricePS5Disc});
    scrapedConsoles.push(newConsole1);
    await newConsole1.save().catch(err => console.log("Error saving newProduct = " + err));

    // Scrape Playstation 5 Digital Edition
    await page.goto(urlPS5Digital);  // Open URL for PS5 Digital Edition

    const [el4] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[1]/div/img'); //Image URL for PS5 with Disc drive
    const srcPS5Dig = await el4.getProperty('src');
    const imageURLPS5Dig =  await srcPS5Dig.jsonValue();

    const [el5] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[2]/div[1]/div[5]/h1'); //Name for PS5 with Disc drive
    const txtNamePS5Dig = await el5.getProperty('textContent');
    const titlePS5Dig =  await txtNamePS5Dig.jsonValue();
    
    const [el6] = await page.$x('//*[@id="app"]/div[4]/div[1]/div/div/div[1]/div[1]/div[2]/div[3]/ul/li[3]/strong'); //Price for PS5 with Disc drive
    const txtPricePS5Dig = await el6.getProperty('textContent');
    const pricePS5Dig =  await txtPricePS5Dig.jsonValue();      
    
    const newConsole2 = await new Console({ title: titlePS5Dig, imageURL: imageURLPS5Dig, price: pricePS5Dig});
    scrapedConsoles.push(newConsole2);
    await newConsole2.save().catch(err => console.log("Error saving newProduct = " + err));

    // Scrape Xbox Series X
    await page.goto(urlXboxSeriesX);  // Open URL for Xbox Series X

    const [el7] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[1]/div/img'); //Image URL for Xbox Series X
    const srcXboxX = await el7.getProperty('src');
    const imageURLXboxX =  await srcXboxX.jsonValue();

    const [el8] = await page.$x('//*[@id="app"]/div[4]/div/div/div/div[2]/div[1]/div[5]/h1'); //Name for Xbox Series X
    const txtNameXboxX = await el8.getProperty('textContent');
    const titleXboxX =  await txtNameXboxX.jsonValue();
    
    const [el9] = await page.$x('//*[@id="app"]/div[4]/div/div/div/div[1]/div[1]/div[2]/div[3]/ul/li[3]/strong'); //Price for Xbox Series X
    const txtPriceXboxX = await el9.getProperty('textContent');
    const priceXboxX =  await txtPriceXboxX.jsonValue();      
    
    const newConsole3 = await new Console({ title: titleXboxX, imageURL: imageURLXboxX, price: priceXboxX});
    scrapedConsoles.push(newConsole3);
    await newConsole3.save().catch(err => console.log("Error saving newProduct = " + err));

    // Scrape Xbox Series S
    await page.goto(urlXboxSeriesS);  // Open URL for Xbox Series S

    const [el10] = await page.$x('//*[@id="ProductViewSticky"]/div/div[4]/div/div/div[1]/div/img'); //Image URL for Xbox Series S
    const srcXboxS = await el10.getProperty('src');
    const imageURLXboxS =  await srcXboxS.jsonValue();

    const [el11] = await page.$x('//*[@id="app"]/div[4]/div/div/div/div[2]/div[1]/div[5]/h1'); //Name for Xbox Series S
    const txtNameXboxS = await el11.getProperty('textContent');
    const titleXboxS =  await txtNameXboxS.jsonValue();
    
    const [el12] = await page.$x('//*[@id="app"]/div[4]/div/div/div/div[1]/div[1]/div[2]/div[2]/ul/li[3]/strong'); //Price for Xbox Series S
    const txtPriceXboxS = await el12.getProperty('textContent');
    const priceXboxS =  await txtPriceXboxS.jsonValue();      
    
    const newConsole4 = await new Console({ title: titleXboxS, imageURL: imageURLXboxS, price: priceXboxS});
    scrapedConsoles.push(newConsole4);
    await newConsole4.save().catch(err => console.log("Error saving newProduct = " + err));

    browser.close();
    res.send(scrapedConsoles);
});


router.get("/generate-users", (req, res, next) => {
    let userOne = new User();

    userOne.username = "Leto";
    userOne.password = "Atreides";
    
    userOne.save((err) => {
        if (err) throw err;
    });
});
/////Authentication/////////////////////////////
router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;    

    console.log("Made it to the route")
    User.findOne({ username: username })
    .exec((err, user) => {
        if (err) return next(err);
        // if user is found, check if their password matches the password
        if (user && user.password == password) {           
            res.send(user);
        } else if (user && user.password !== password) {
            res.send(401, 'Wrong password.')
        } else if (!user) {
            res.send(401, 'No user found.')
        }
    })
});
////////Authentication/////////////////////////////

router.get('/getGPUs/:gpu', async (req, res, next) => {
    //console.log(req.params.gpu)
    cardToBeSearched = req.params.gpu;
    
    await GPU.find({ title: { "$regex": cardToBeSearched.toString() } })  // Hardcode "3080" to test
    .sort({date: 'asc'})
    .exec((err, results) => {
        if (err) throw err;
        res.send(results);
    });
}); 

router.get('/getConsoles/:console', async (req, res, next) => {
    consoleToBeSearched = req.params.console;

    await Console.find({ title: {"$regex": consoleToBeSearched.toString()} })  // Hardcode Xbox Series X to test
        .sort({date: 'asc'})
        .exec((err, results) => {
            if (err) throw err;
            res.send(results);
        });
});

module.exports = router; 
