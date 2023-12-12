import { createButton, createVariantsWrapper, handleButtonDropImg } from "./domElements.js";

const normalProduct = (product) => {
  product.options.forEach((option, i) => {
    const row = document.querySelector(`.products-list.prod-${product.id}-${i}`);
    row.setAttribute("not-selected-id",`${product.id}-${option.id}`)
    const hasImg = row.classList.contains("has-img") || row.classList.contains("has-img-desktop");
    const [variantsWrapper, dropdownMobile, dropdownImg] = createVariantsWrapper(row, option.values, hasImg);
    option.values.forEach((value) => {
      const [wrapper, button] = createButton({
        optionId: option.id,
        variantId: value.id,
        text: value.name,
        hasImg: hasImg,
        src: value.images[0],
        variantPrice: value.price,
      });
      variantsWrapper.appendChild(wrapper);
      handleButtonDropImg(value, button, dropdownMobile, hasImg, dropdownImg);
    });
    if (!row.hasAttribute("dropdown-text")) row.querySelector("input").checked = true;
  });
};

export default normalProduct;
