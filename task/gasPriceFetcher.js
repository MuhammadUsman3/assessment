const puppeteer = require('puppeteer');


async function getGasPrice() {

    let response = {
        success: false,
        data: {}
    }

    const browser = await puppeteer.launch({
        headless: true
    });
    try {
        
        const page = await browser.newPage();
        await page.goto("https://snowtrace.io/");

        await page.waitForSelector('span[class="small break-all text-slate-500 ml-1"]', { timeout: 10_000 });

        const gasPriceText = await page.evaluate(() => {
            const gasPriceElement = document.querySelector('div.text-right a span.text-link');
            const gasPriceUsdElement = document.querySelector('div.text-right span.new-line-xxs span');

            if (gasPriceElement && gasPriceUsdElement) {
                const gasPriceStr = gasPriceElement.innerHTML
                const gasPriceUsdStr = gasPriceUsdElement.innerHTML
                const gasPriceData = gasPriceStr.split(" ")
                const gasPriceUsdData = parseFloat(gasPriceUsdStr.replace(/[^\d.]/g, ''));
                return  {
                    success: true,
                    data: {
                        gasprice: Number(gasPriceData[0]),
                        gasprice_unit: gasPriceData[1],
                        gasprice_usd: gasPriceUsdData,
                        timestamp: Date.now()
                    }
                }
            }

            // if gas price not found then throw exception and go to catch block and send the default response
            throw new Error("could not found the price")

        });
        response = gasPriceText
    } catch (error) {

    }

    browser.close()
    return response

}

module.exports = {
    getGasPrice
}