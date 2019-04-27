const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(
      "http://www.mbet88vn.com/tong-hop-girl-viet-nam-sexy-cuc-nhuc-nhoi-phan-1.html"
    );
    const articles = await page.evaluate(() => {
      let elements = [
        ...document.querySelectorAll("img[class*='alignnone wp-image']")
      ];
      console.log(elements);
      let array = [];
      for (i = 1; i <= elements.length; i++) {
        let listsrc = elements[i].srcset.split(",");
        array = { url: listsrc[listsrc.length - 1] };
      }

      /* elements.forEach(function(val, index) {
        let listsrc = val.srcset.split(",");
        console.log(listsrc[listsrc.length - 1]);
        array = { url: listsrc[listsrc.length - 1] };
      });*/
      return array;
    });

    await browser.close();
  } catch (error) {
    console.log("Catch : " + error);
  }
})();
