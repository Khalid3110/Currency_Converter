const BASE_URL1 = "https://api.exchangerate-api.com/v4/latest";

let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg-container");

window.addEventListener("load", () => {
  updateExchangeRate();
});

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evn) => {
    changeFlag(evn.target);
  });
}

const changeFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector("form input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amount.value = 1;
    amtValue = 1;
  }

  const URL = `${BASE_URL1}/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  let finalAmt = amtValue * rate;

  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt.toFixed(3)} ${
    toCurr.value
  }`;
};
