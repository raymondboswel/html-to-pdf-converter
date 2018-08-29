const puppeteer = require("puppeteer");

module.exports = {
  async printToPdfFromString(html) {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--allow-running-insecure-content",
        "--allow-insecure-localhost",
        "--acceptInsecureCerts=true"
      ]
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html,${html}`, { waitUntil: "networkidle0" });
    await page.screenshot({ path: "output.png" });
    const pdfBuffer = await page.pdf({
      path: "output.pdf",
      format: "A4",
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        left: "0.35cm",
        right: "0.35cm",
        top: "0.35cm",
        bottom: "0.35cm"
      }
    });

    await browser.close();
    return pdfBuffer.toString("base64");
  }
};
