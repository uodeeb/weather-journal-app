/*_______________________________________ Global __________________________________ */
let allData = [];

/*______________________________________ Build a Constructor _______________________*/
function CollectAllData(id, date, zip, feel, temp) {
  this.id = id,
  this.date = date,
  this.zip = zip,
  this.feel = feel,
  this.temp = temp
}

/*________________________________________Collect User Input ______________________ */
async function collectInput() {
  const generateButton = document.getElementById('generate');
  const zipContainer = document.getElementById('zip');
  const feelingsContainer = document.getElementById('feelings');
  generateButton.addEventListener('click', (e) => {
    if (zipContainer.value !== '' && feelingsContainer.value !== '') {
      zip = zipContainer.value;
      feel = feelingsContainer.value;
      zipContainer.style.background = '';
      feelingsContainer.style.background = '';
      getAllData(zip, feel);
      paintUI();
    } else if (zipContainer.value == '') {
      zipContainer.setAttribute('placeholder', 'You Have To Add A Zip code');
      zipContainer.style.background = 'rgba(248, 94, 101, 0.2)';
    } else if (feelingsContainer.value == '') {
      feelingsContainer.setAttribute(
        'placeholder',
        'You Have To Add Your Feelings'
      );
      feelingsContainer.style.background = 'rgba(248, 94, 101, 0.2)';
    }
  });
}

/*_________________________________________ Get The Date __________________________ */
async function getDate() {
  let d = new Date();
  let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
  return newDate;
}

/*_______________________________________ Collect API Data _________________________ */
async function collectApiData(zip) {
  let tempp;
  const endPoint = 'https://api.openweathermap.org/data/2.5/weather?';
  const apiKey = 'f4a408c438be111a51787449d669ff68';
  await fetch(`${endPoint}zip=${zip}&appid=${apiKey}`)
    .then((resp) => resp.json())
    .then((data) => {
      tempp = data.main.temp;
    });
  return tempp;
}

/*________________________________________ Get Random Id ___________________________ */
async function getRandomId() {
  const randomValues = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return randomValues.toString(16);
}

/*_______________________________________ Post Data To Server _______________________ */
async function postDataToServer() {
  const rawResponse = await fetch('/get-data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(allData),
  });
  const content = await rawResponse.json();
  return content;
}

/*________________________________________ Get Data From Server _____________________ */
async function getDataFromServer() {
  let store;
  await fetch('/get-data')
    .then((resp) => resp.json())
    .then((dataa) => {
      console.log(dataa);
      console.log('the getdata works!!!');
      store = dataa;
    });
  return store;
}

/*________________________________________put all data in one place________________ */
async function getAllData(zip, feel) {
  const data = new CollectAllData(
    await getRandomId(),
    await getDate(),
    zip,
    feel,
    await collectApiData(zip)
  );
  allData.push(data);
  console.log(allData);
  await postDataToServer();
}

/*________________________________________ Paint UI __________________________________ */
async function paintUI() {
  let finalData = await getDataFromServer();
  const cont = document.getElementById('entryHolder');
  const date = document.createElement('div');
  const temp = document.createElement('div');
  const content = document.createElement('div');
  finalData.map((entry) => {
    let docFrag = document.createElement('section');
    date.innerHTML = `<i class='far fa-calendar-alt'></i>  ${entry.date}`;
    date.classList.add('box');
    temp.innerHTML = `<i class='fas fa-temperature-high'></i>  ${entry.temp}`;
    temp.classList.add('box');
    content.innerHTML = `Feeling: ${entry.feel}`;
    content.classList.add('box');
    docFrag.append(date, temp, content);
    docFrag.classList.add('entry__cont');
    cont.appendChild(docFrag);
  });
}

collectInput();
