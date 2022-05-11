const {google} = require('googleapis');
//const spawn = require('child_process').spawn;
const sheets = google.sheets('v4');
const {DATA_EMAIL, DATA_PASSWORD, URL} = require('./config.js')
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');

  const run = async () => { // 1. chromedriver 경로 설정 // chromedriver가 있는 경로를 입력 
    const service = new chrome.ServiceBuilder('./chromedriver_win32/chromedriver.exe').build();
     chrome.setDefaultService(service); // 2. chrome 브라우저 빌드 
     const driver = await new webdriver.Builder() .forBrowser('chrome') .build(); // 3. google 사이트 열기 
     await driver.get('https://builder.pingpong.us/login'); // 4. 3초 후에 브라우저 종료 

     const loginemail = await driver.findElement(By.name('email')); 
     await loginemail.sendKeys(DATA_EMAIL)

     const loginpwd = await driver.findElement(By.name('password')); 
     await loginpwd.sendKeys(DATA_PASSWORD)

     const loginBtn = await driver.findElement(By.className('gw_gy'));
     await loginBtn.click();

    await driver.get(URL)

    setTimeout(async () => { 
      for(var i=0; i<3; i++){
        const Btn = await driver.findElement(By.className('tool-tip-next'));
        await Btn.click(); 
        if(i == 2){
          const uploadBtn = await driver.findElement(By.className('gw_gy gw_gA'));
          await Btn.click();
        }
      }
    }, 5000); 
    
     setTimeout(async () => { await driver.quit(); process.exit(0); }, 20000); 
    } 
  run();
