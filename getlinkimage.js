const puppeteer = require('puppeteer');

var Datastore = require('nedb');


db = {};
db.database = new Datastore({
    filename: 'database.db',
    autoload: true
});
db.dblinkanh = new Datastore({
    filename: 'linkanh.db',
    autoload: true
});
db.database.loadDatabase();
db.dblinkanh.loadDatabase();





(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        db.database.find({}, function (err, docs) {
            docs.forEach(pageimage => {

                console.log(pageimage.url);
                await page.goto(pageimage.url);

                const articles = await page.evaluate(() => {
                    let elements = [...document.querySelectorAll('#box_sec > div > p > img')];
                    let array = elements.map(song => ({
                        src: song.src,

                    }));
                    return array;

                });

                console.log(articles);
            });
        });
        await browser.close();

    } catch (error) {
        console.log("Catch : " + error);
    }
})();