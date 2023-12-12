const createDropdown = (values, hasText = false) => {
  const dropdown = document.createElement("div");
  const p = document.createElement("p");
  const svg =
    '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z" fill="black"/></svg>';
  dropdown.setAttribute("role", "button");
  dropdown.classList.add("dropdown-mobile");
  p.innerHTML = (hasText && `<span class="placeholder-text">${hasText}</span>`) || values[0].name;
  dropdown.appendChild(p);
  dropdown.insertAdjacentHTML("beforeend", svg);
  dropdown.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT") dropdown.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) || e.target.tagName === "INPUT") dropdown.classList.remove("active");
  });
  return dropdown;
};

const createSimpleButton = ({ hasImg, src, text, variantId, optionId }) => {
  const wrapper = document.createElement("div");
  let img;
  if (hasImg) {
    img = document.createElement("img");
    img.src = src;
    img.alt = text;
    img.classList.add("img");
  }
  const label = document.createElement("label");
  const labelText = document.createElement("span");
  const labelBall = document.createElement("span");
  const button = document.createElement("input");
  const labelContent = document.createElement("span");
  wrapper.appendChild(button);
  wrapper.appendChild(label);
  if (hasImg) label.appendChild(img);
  label.appendChild(labelContent);
  labelContent.appendChild(labelBall);
  labelContent.appendChild(labelText);

  labelContent.classList.add("label");
  wrapper.classList.add("button-wrapper");
  labelText.classList.add("label-text");
  labelBall.classList.add("label-ball");
  label.setAttribute("for", `${optionId}-${variantId}`);
  label.setAttribute("role", "button");
  labelText.innerHTML = text;
  button.id = `${optionId}-${variantId}`;
  button.value = `${variantId}`;
  button.type = "radio";
  button.setAttribute("hidden", "");
  return [button, wrapper, labelText];
};

const removeShake = (el) => {
  while (!el.parentNode.classList.contains("products-list")) el = el.parentNode;
  el.parentNode.classList.remove("shake");
};

const createButton = ({ optionId, variantId, text, hasImg, src = "", variantPrice = "" }) => {
  const [button, wrapper] = createSimpleButton({ hasImg: hasImg, src: src, text: text, variantId: variantId, optionId });
  button.name = optionId;
  button.setAttribute("price", variantPrice);
  button.setAttribute("label-text", text);
  button.addEventListener("change", () => {
    removeShake(button);
  });
  return [wrapper, button];
};

const handleButtonDropImg = (variant, button, dropdownMobile, hasImg, dropdownImg) => {
  if (dropdownMobile)
    button.addEventListener("change", () => {
      dropdownMobile.querySelector("p").innerHTML = button.getAttribute("label-text");
    });
  if (hasImg)
    button.addEventListener("change", () => {
      dropdownImg.src = variant.images[0];
      dropdownImg.alt = variant.name;
    });
};

const createVariantsWrapper = (element, values, hasImg) => {
  const variantsWrapper = document.createElement("div");
  let dropdownImg;
  if (hasImg) {
    dropdownImg = document.createElement("img");
    dropdownImg.classList.add("dropdown-img");
    dropdownImg.src = values[0].images[0];
    dropdownImg.alt = values[0].name;
    element.appendChild(dropdownImg);
  }

  variantsWrapper.classList.add("variants-wrapper");
  let dropdown = undefined;
  if (element.classList.contains("has-dropdown-mobile") || element.classList.contains("has-dropdown")) {
    const hasText = element.getAttribute("dropdown-text");
    dropdown = createDropdown(values, hasText);
    element.appendChild(dropdown);
  }
  element.appendChild(variantsWrapper);
  return [variantsWrapper, dropdown, dropdownImg];
};

const createMultipleOptionsDOM = (stock, element, primaryOption, secondaryOption, product, hasImg) => {
  const getNewName = (value) => {
    switch (value) {
      case "Small":
        return "S";
      case "Medium":
        return "M";
      case "Large":
        return "L";
      case "X-Large":
        return "XL";
      case "2XL":
        return "XXL";
      default:
        return value;
    }
  };

  const updateSizes = (secondaryWrapper, primarySelected) => {
    const prevSelected = secondaryWrapper.querySelector(["input:checked"]);
    secondaryWrapper.innerHTML = "";
    secondaryOption.values.forEach((size) => {
      if (stock[`[${primarySelected},${size.id}]`] || stock[`[${size.id},${primarySelected}]`]) {
        const [wrapper, button] = createButton({
          optionId: secondaryOption.id,
          variantId: size.id,
          text: getNewName(size.name),
          hasImg: false,
        });
        if (prevSelected?.value == size.id) button.checked = true;
        secondaryWrapper.appendChild(wrapper);
      }
    });
  };

  const updateImageMultiple = (primaryOption, name, img) => {
    for (let value of primaryOption.values) {
      if (value.name.includes(name)) {
        img.src = value.images[0];
        return;
      }
    }
  };

  let img;
  if (hasImg) {
    img = document.createElement("img");
    img.classList.add("dropdown-img");
    updateImageMultiple(primaryOption, primaryOption.values[0].name, img);
    element.appendChild(img);
  }

  const createSecondaryVariantWrapper = () => {
    const variantsWrapper = document.createElement("div");
    variantsWrapper.classList.add("sizes-wrapper");
    document.querySelector(`.prod-${product.id}-1`).appendChild(variantsWrapper);
    return variantsWrapper;
  };

  const createPrimaryVariantWrapper = (option) => {
    const variantsWrapper = document.createElement("div");
    variantsWrapper.classList.add("variants-wrapper");
    const dropdown = createDropdown(option.values);
    const selectedText = dropdown.querySelector("p");
    element.appendChild(dropdown);
    dropdown.appendChild(variantsWrapper);
    option.values.forEach((value) => {
      const [wrapper, button] = createButton({ optionId: option.id, variantId: value.id, text: value.name, hasImg: false });
      variantsWrapper.appendChild(wrapper);
      button.addEventListener("change", () => {
        selectedText.innerHTML = button.getAttribute("label-text");
      });
    });
    const inputs = variantsWrapper.querySelectorAll("input");
    inputs[0].checked = true;
    return [variantsWrapper, selectedText];
  };

  const [primaryVariantsWrapper] = createPrimaryVariantWrapper(primaryOption);
  const secondaryVariantsWrapper = createSecondaryVariantWrapper();

  primaryVariantsWrapper.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      if (hasImg) {
        updateImageMultiple(primaryOption, input.getAttribute("label-text"), img);
      }
      updateSizes(secondaryVariantsWrapper, input.value);
    });
  });
  updateSizes(secondaryVariantsWrapper, primaryVariantsWrapper.querySelector("input").value);
};

export { createButton, createVariantsWrapper, createMultipleOptionsDOM, createSimpleButton, handleButtonDropImg };
