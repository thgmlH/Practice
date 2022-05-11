const {google} = require('googleapis');
const sheets = google.sheets('v4');
const {DATA_EMAIL, DATA_PASSWORD, URL, SPREADSHEETID, AUTH} = require('./config.js')

async function main () {
  const authClient = await authorize();
  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: SPREADSHEETID,  // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    ranges: 'test!M2:R99',
     // TODO: Update placeholder value.

    majorDimension : 'COLUMNS',

    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.batchGet(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();

async function authorize() {

  let authClient = AUTH;

  if (authClient == null) {
    throw Error('authentication failed');
  }

  return authClient;
}
