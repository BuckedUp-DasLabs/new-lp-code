import { fetchUrl } from "../../variables.js";

const handleLoad = async ({ids, country, hiddenIds}) => {
  const data = { data: [], noStock: false, error: false, hidden: [] };
  const handleStock = () => {
    [...data.data, ...data.hidden].forEach((product) => {
      const isNormalProduct = Object.hasOwn(product.options[0].values[0], "in_stock");
      if (!isNormalProduct) {
        if (Object.values(product.stock).every((val) => val <= 0)) {
          data.noStock = true;
          return;
        }
        const mainOption = product.options[0];
        const secondaryOption = product.options[1];
        for (let mainValue of mainOption.values) {
          let hasStock = false;
          for (let secondValue of secondaryOption.values) {
            if (
              (product.stock[`[${mainValue.id},${secondValue.id}]`] !== undefined && product.stock[`[${mainValue.id},${secondValue.id}]`] > 0) ||
              (product.stock[`[${secondValue.id},${mainValue.id}]`] !== undefined && product.stock[`[${secondValue.id},${mainValue.id}]`] > 0)
            ) {
              hasStock = true;
            }
          }
          if (!hasStock) mainOption.values = mainOption.values.filter((value) => value.id !== mainValue.id);
        }
        return;
      }
      for (let option of product.options) {
        if (!option.values.length == 0) {
          //if already 0, then no point in checking.
          option.values = option.values.filter((value) => value.in_stock);
          if (option.values.length <= 0) data.noStock = true;
        }
      }
    });
  };

  const fetchEveryProduct = (ids, isHidden) => {
    const fetchApi = async (id) => {
      let url = `${fetchUrl}${id}`;
      if(country) url = url + `?country=${country}`
      try {
        const response = await fetch(url);

        if (response.status === 404) throw new Error("Product Not Found.");
        if (response.status == 500 || response.status == 400) throw new Error("Sorry, there was a problem.");

        const apiData = await response.json();
        isHidden ? data.hidden.push(apiData.product) : data.data.push(apiData.product);
      } catch (error) {
        data.error = { hasError: true, message: error.message };
        if (error.message === "Sorry, there was a problem.") data.error["redirect"] = true;
      }
    };

    return Promise.all(ids.map((id) => fetchApi(id)));
  };
  await fetchEveryProduct(ids, false);
  await fetchEveryProduct(hiddenIds, true);
  handleStock();
  return data;
};

export default handleLoad;
