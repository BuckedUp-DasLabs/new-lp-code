const urlParams = new URLSearchParams(window.location.search);
const utm_source = "";
const step_count = "";
const page_id = "";
const version_id = "";

const isFirstPage = true;
const isFinalPage = false;

const orderId = null;
const country = null;
const buyRedirect = ``;

const params = {};
for (let key in params) {
  urlParams.set(key, params[key]);
}

const productsID = [999]; //ID of each the product
const hiddenProducts = [];
const buyButtonsIds = [{ id: "#element-35", quantity: 2 }]; //IDs of each button of each product(in the order put in productID).
const noThanksButtonsIds = ["#element-36"];
const redirectUrl = `https://.com?${urlParams}`;
const noThanksRedirect = `https://.com?${urlParams}`;

//stop here.
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie = `offer_id=${origin}; path=/; domain=.buckedup.com;max-age=3600`;
document.cookie = `page_id=${page_id}; path=/; domain=.buckedup.com;max-age=3600`;
if (isFirstPage) localStorage.setItem("first_page", origin);
