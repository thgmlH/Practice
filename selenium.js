const {google} = require('googleapis');
//const spawn = require('child_process').spawn;
const sheets = google.sheets('v4');
const {DATA_EMAIL, DATA_PASSWORD, URL, SPREADSHEETID, AUTH} = require('./config.js')
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');

  const run = async () => { // 1. chromedriver 경로 설정 
    // chromedriver가 있는 경로를 입력 
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
    var i;
    for(i=0; i<3; i++){
      const Btn = await driver.findElement(By.className('tool-tip-next'));
      await Btn.click(); 
      if(i == 2){
        const uploadBtn = await driver.findElement(By.className('gw_gy gw_gA'));
        await uploadBtn.click();
      }
    }
    setTimeout(async () => {
      if(i == 3){
        const fileupload = await driver.findElement(By.xpath("//button[contains(text(), '파일 추가')]"))
        await fileupload.click();
        i = 0;
      }
      if(i == 0){
        const file = driver.findElement(By.xpath("//input[@id='pingpong-scripts']"))
        file.sendKeys('./scenario.csv');
      }
    }, 4000)
    
  }, 6000); 


  setTimeout(async () => { await driver.quit(); process.exit(0); }, 23000); 
  } 
  run();

  /*        const fileupload = await driver.findElement(By.className('gw_gy'))
        await fileupload.click();*/
