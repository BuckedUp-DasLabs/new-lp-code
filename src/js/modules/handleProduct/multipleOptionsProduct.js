import { createMultipleOptionsDOM } from "./domElements.js";

const multipleOptionsProduct = (product) => {
  //filtrar com base no estoque de todas que tem essa opção
  const primaryOption = product.options[0];
  const secondaryOption = product.options[1];
  const stock = product.stock;
  primaryOption.values.forEach((color) => {
    secondaryOption.values.forEach((size) => {
      if (stock[`[${color.id},${size.id}]`] <= 0) delete stock[`[${color.id},${size.id}]`];
      if (stock[`[${size.id},${color.id}]`] <= 0) delete stock[`[${size.id},${color.id}]`];
    });
  });
  const primaryRow = document.querySelector(`.prod-${product.id}-0`);
  const secondaryRow = document.querySelector(`.prod-${product.id}-1`);
  primaryRow.setAttribute("primary", product.id);
  secondaryRow.setAttribute("not-selected-id", `${product.id}-${product.options[1].id}`);

  createMultipleOptionsDOM(
    stock,
    primaryRow,
    primaryOption,
    secondaryOption,
    product,
    primaryRow.classList.contains("has-img") || primaryRow.classList.contains("has-img-desktop")
  );

  return true;
};

export default multipleOptionsProduct;
