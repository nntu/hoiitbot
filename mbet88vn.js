const puppeteer = require('puppeteer');






(async() => {
    try {
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();
        await page.goto('http://www.mbet88vn.com/tong-hop-girl-viet-nam-sexy-cuc-nhuc-nhoi-phan-1.html');
        const articles = await page.evaluate(() => {
            elements =   document.querySelector('#post-1763 > div > p:nth-child(30) > img')
          
            console.log(elements)
             
             
            
        });
       
        await browser.close();
    }
    catch (error) {
        console.log("Catch : " + error);
    }

})();