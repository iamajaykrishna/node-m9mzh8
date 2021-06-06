const fetch = require('node-fetch');
const notifier = require('./notifier.js');

let requestIndex = 0;
let requestModifier = [
  '06-06-2021',
  '07-06-2021',
  '08-06-2021',
  '09-06-2021',
  '10-06-2021',
  '11-06-2021',
  '12-06-2021',
  '13-06-2021',
  '14-06-2021',
  '15-06-2021',
  '16-06-2021',
  '17-06-2021',
  '18-06-2021',
  '19-06-2021',
  '20-06-2021'
];
let showAlert = true;

async function getData() {
  let date = requestModifier[requestIndex++];
  let request_link =
    'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=269';
  request_link = request_link + '&date=' + date;
  await fetch(request_link)
    .then(response => response.json())
    .then(responseData => {
      console.log('Fetched data for date: ' + date + '!');
      responseData = responseData['sessions'];
      let subData = Object.keys(responseData);
      for (let i = 0; i < subData.length; i++) {
        let obj = responseData[subData[i]];
        if (
          showAlert &&
          obj['min_age_limit'] === 18 &&
          obj['available_capacity_dose1'] > 0
        ) {
          if (obj['fee_type'] === 'Free') {
            notifier.sendNotification(
              obj['name'] +
                ' - ' +
                obj['available_capacity_dose1'] +
                ' slot available on ' +
                obj['date'] +
                ' at ' +
                'FREE!!'
            );
          } else {
            notifier.sendNotification(
              obj['name'] +
                ' - ' +
                obj['available_capacity_dose1'] +
                ' slot available on ' +
                obj['date'] +
                ' at ' +
                obj['fee'] +
                '/-!'
            );
          }
          showAlert = false;
        }
      }
      if (requestIndex >= requestModifier.length) {
        requestIndex = 0;
      }
      getData();
    })
    .catch(error => {
      console.log(
        '\nResponse for (' +
          date +
          ') : ' +
          request_link +
          ' is catched. ' +
          error
      );
      if (requestIndex >= requestModifier.length) {
        requestIndex = 0;
      }
      getData();
    });
}

getData();

setInterval(function() {
  showAlert = true;
}, 1000000);
