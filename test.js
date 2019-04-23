const puppeteer = require('puppeteer');

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'database.db', autoload: true });

(async() => {
    try {
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();
        for(let i = 2; i <= 110; i++ ){
          
        await page.goto('http://www.gioitre.net/girl-xinh?page='+i);

        const articles = await page.evaluate(() => {
            let elements =[...document.querySelectorAll('body > div.main-content > div > div.col-lg-8.left > div.listLage > ul > li > a')];
            let array = elements.map(song => ({
                title: song.title,
                url: song.href,
                img : song.getElementsByTagName('img')[0].src
            }));
            return array;
            
        });
        db.insert(articles, function (err, newDocs) {
            // Two documents were inserted in the database
            // newDocs is an array with these documents, augmented with their _id
          });
        console.log(articles);
       
       }
       await browser.close();
        
    } catch (error) {
        console.log("Catch : " + error);
    }
})();