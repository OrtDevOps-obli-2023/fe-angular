(async function run() {

  var assert = require('assert'),
  webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until,
  chrome = require('selenium-webdriver/chrome'),
  firefox = require('selenium-webdriver/firefox');

  var path = require('chromedriver').path;
  const chromeOptions = new chrome.Options()
  .addArguments('--no-sandbox')
  .addArguments('--disable-dev-shm-usage')
  .addArguments('--headless');

  var driver = chrome.Driver.createSession(chromeOptions, new 
  chrome.ServiceBuilder(path).build());

  const logging = require('selenium-webdriver/lib/logging')
  logger = logging.getLogger('webdriver')

  try {
    logger.setLevel(logging.Level.INFO);
    logging.installConsoleHandler()

    //const deployedURL = 
    const deployedURL =process.argv[2]; // get url as parameter 'http://bucket-fe-angular-dev.s3-website-us-east-1.amazonaws.com/index.html';
    await driver.get(deployedURL);

    var elements = ['pepe'];
    const currentDate = new Date();
    // Sleep until the div we want is visible or 5 seconds is over
    var end = currentDate.getMilliseconds() + 10000;
    while (currentDate.getMilliseconds() < end) {
        elements = await driver.findElements(By.tagName('a'));

        // If results have been returned, the results are displayed in a drop down.
        if (elements.length > 0) {
          break;
        }
    }

    assert.notEqual(elements.length,0);

     // Iterate over the elements
     for (const element of elements) {
      // Check if the element is clickable
      if (await element.isDisplayed() && await element.isEnabled()) {
        // Perform a click action on the element

        await element.click();
        await driver.sleep(3000);
        // Wait for page load or any necessary action

        //assert if element is there
        driver.findElement(By.className("mat-button-wrapper"));
        
        
        await driver.sleep(1000);
       
        // Go back to the previous page
        await driver.navigate().back();
      }
    }

     // return driver;
    // Add more test actions as needed
  }
 catch (error) {
  console.error('Error running Selenium test:', error);
  assert.fail('Assertion failed');
} finally {
    await driver.quit();
  }
})();