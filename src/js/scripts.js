import handleLoad from "./modules/handleProduct/handleLoad.js";
import normalProduct from "./modules/handleProduct/normalProduct.js";
import multipleOptionsProduct from "./modules/handleProduct/multipleOptionsProduct.js";
import toggleLoading from "./modules/toggleLoading.js";
import buy from "./modules/buy.js";
import { dataLayerNoThanks, dataLayerStart } from "./modules/dataLayer.js";
import postApi from "./modules/postApi.js";
import { finishUrl } from "./variables.js";

const setQuantity = (id) => {
  const isString = typeof id === "string";
  const button = document.querySelector(isString ? id : id.id);
  if (!isString) {
    id.quantity && button.setAttribute("quantity", id.quantity);
    id.products && button.setAttribute("products", id.products);
  }
  return button;
};
const buyButton = [];
const noThanksButtons = [];

buyButtonsIds.forEach((ids) => {
  buyButton.push(setQuantity(ids));
});
noThanksButtonsIds.forEach((ids) => {
  noThanksButtons.push(setQuantity(ids));
});

const main = async () => {
  toggleLoading();
  const data = await handleLoad({ ids: productsID, hiddenIds: hiddenProducts, country: country });
  if (data.noStock) {
    alert("Product not found.");
    window.location.href = "https://buckedup.com";
    return;
  }
  if (data.error.hasError) {
    console.log(data.error.message);
    if (data.error.redirect) {
      window.location.href = "https://buckedup.com";
    }
    return;
  }
  data.data.forEach((product) => {
    const isNormalProduct = Object.hasOwn(product.options[0].values[0], "in_stock");
    if (isNormalProduct) normalProduct(product);
    else {
      multipleOptionsProduct(product);
    }
    return;
  });
  dataLayerStart([...data.data, ...data.hidden]);

  buyButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.hasAttribute("disabled")) {
        buy(btn, data.data, data.hidden);
      }
    });
  });

  noThanksButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      toggleLoading();
      dataLayerNoThanks([...data.data, ...data.hidden]);
      if (isFinalPage) {
        const response = await postApi(finishUrl, null);
        console.log(response);
      }
      window.location.href = noThanksRedirect;
    });
  });

  toggleLoading();
};

main();
