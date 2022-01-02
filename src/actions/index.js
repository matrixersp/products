import { appConstants } from "../constants";

export const getContentSlots = (payload) => {
  return {
    type: appConstants.GET_CONTENT_SLOTS_SUCCESS,
    payload,
  };
};

export const retrieveProduct = (payload) => {
  const images = payload.map((image) => {
    let productCode = image?.productCode;
    let contentSlot = image?.slot;

    const matcher = /^(.*)_(.*)\./;

    if (!productCode || image?.productCode === "") {
      [, productCode = image?.name?.replace(/\.[^/.]+$/, "")] =
        matcher.exec(image?.name) ?? [];
    }

    if (!contentSlot || image?.slot === "") {
      [, , contentSlot = ""] = matcher.exec(image?.name) ?? [];
    }

    return {
      productCode,
      newProductCode: productCode,
      contentSlot,
      productName: "",
      imageFile: null,
      imageFileName: image?.name,
      imageUrl: image?.imageUrl,
    };
  });

  return {
    type: appConstants.UPLOAD_PRODUCT_SUCCESS,
    payload: images,
  };
};

export const uploadProduct = (payload) => {
  const images = payload.map((image) => {
    let productCode = image?.productCode;
    let contentSlot = image?.slot;

    const matcher = /^(.*)_(.*)\./;

    if (!productCode || image?.productCode === "") {
      [, productCode = image?.name?.replace(/\.[^/.]+$/, "")] =
        matcher.exec(image?.name) ?? [];
    }

    if (!contentSlot || image?.slot === "") {
      [, , contentSlot = ""] = matcher.exec(image?.name) ?? [];
    }

    return {
      productCode,
      newProductCode: productCode,
      contentSlot,
      productName: "",
      imageFile: null,
      imageFileName: image?.imageFileName,
      imageUrl: image?.imageUrl,
    };
  });

  return {
    type: appConstants.UPLOAD_PRODUCT_SUCCESS,
    payload: images,
  };
};

export const changeProductCode = (productIndex, productCode) => {
  return {
    type: appConstants.CHANGE_PRODUCT_CODE,
    payload: {
      productIndex,
      productCode,
    },
  };
};

export const changeProductName = (productIndex, productName) => {
  return {
    type: appConstants.CHANGE_PRODUCT_NAME,
    payload: {
      productIndex,
      productName,
    },
  };
};

export const changeProductCategory = (productIndex, productCategory) => {
  return {
    type: appConstants.CHANGE_PRODUCT_CATEGORY,
    payload: {
      productIndex,
      productCategory,
    },
  };
};

export const changeContentSlot = (
  imageFileName,
  slotSelectedID,
  productIndex
) => {
  return {
    type: appConstants.CHANGE_CONTENT_SLOT,
    payload: {
      imageFileName,
      slotSelectedID,
      productIndex,
    },
  };
};
