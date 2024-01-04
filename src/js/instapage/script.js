const urlParams = new URLSearchParams(window.location.search);
const step_count = "";
const page_id = "";
const version_id = "";
const urlParamsCookies = ["click_id","utm_source","utm_medium","utm_campaign","utm_term","utm_content"]

const isFirstPage = true;
const isFinalPage = false;

const country = null;
const buyRedirect = ``;

const params = {};
for (let key in params) {
  urlParams.set(key, params[key]);
}

const productsID = [935]; //ID of each the product
const hiddenProducts = [1184];
const buyButtonsIds = ["#element-35",{ id: "#element-37", products:'{"935": {"quantity": 3},"1184": {"quantity": 2}}' },{ id: "#element-38", quantity: 4 }]; //IDs of each button of each product(in the order put in productID).
const noThanksButtonsIds = ["#element-36"];
const redirectUrl = `https://.com?${urlParams}`;
const noThanksRedirect = `https://.com?${urlParams}`;

//stop here.
const origin = window.location.pathname.replace("/", "").replace("/", "");
const cookieConfig = "path=/; domain=.buckedup.com;max-age=3600"
document.cookie = `offer_id=${origin};${cookieConfig}`;
document.cookie = `page_id=${page_id};${cookieConfig}`;
urlParamsCookies.forEach(param=>{
  document.cookie = `${param}=${urlParams.get(param)};${cookieConfig}`;
})
if (isFirstPage) localStorage.setItem("first_page", origin);
