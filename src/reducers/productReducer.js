import { appConstants } from "../constants";

export const initialState = {
  products: [],
  errors: [],
  contentSlots: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.GET_CONTENT_SLOTS_SUCCESS:
      return {
        ...state,
        contentSlots: action.payload,
      };
    case appConstants.UPLOAD_PRODUCT_SUCCESS:
      return action.payload.reduce(
        (
          state,
          {
            productCode,
            newProductCode,
            productName,
            productCategory,
            imageFile,
            imageFileName,
            imageUrl,
            contentSlot,
          }
        ) => {
          const shouldUpdate = state.products.some(
            (product) => product.productCode === productCode
          );

          if (shouldUpdate) {
            return {
              ...state,
              products: state.products.map((product) =>
                product.productCode === productCode
                  ? {
                      ...product,
                      productName: productName
                        ? productName
                        : product?.productName,
                      productImages: product.productImages.concat({
                        contentSlot,
                        imageFile,
                        imageFileName,
                        imageUrl,
                      }),
                    }
                  : product
              ),
            };
          }

          return {
            ...state,
            products: state.products.concat({
              productCode,
              newProductCode,
              productName,
              productCategory,
              productExisting: true,
              productImages: [
                {
                  imageFile,
                  imageFileName,
                  imageUrl,
                  contentSlot,
                },
              ],
            }),
          };
        },
        state
      );

    case appConstants.VALIDATE_SUCCESS:
      return {
        ...state,
        errors: [
          ...state.errors,
          ...action.payload.data.filter((data, idx) => {
            return action.payload.images.some(
              (image) => data.id === image.imageFileName
            );
          }),
        ],
      };

    case appConstants.CHANGE_PRODUCT_CODE:
      return {
        ...state,
        products: state.products.map((product, index) => {
          return index === action.payload?.productIndex
            ? {
                ...product,
                newProductCode: action.payload.productCode,
              }
            : product;
        }),
      };

    case appConstants.CHANGE_PRODUCT_NAME:
      return {
        ...state,
        products: state.products.map((product, index) => {
          return index === action.payload?.productIndex
            ? {
                ...product,
                productName: action.payload.productName,
              }
            : product;
        }),
      };

    case appConstants.CHANGE_PRODUCT_CATEGORY:
      return {
        ...state,
        products: state.products.map((product, index) => {
          return index === action.payload?.productIndex
            ? {
                ...product,
                productCategory: action.payload.productCategory,
              }
            : product;
        }),
      };

    case appConstants.CHANGE_CONTENT_SLOT:
      return {
        ...state,
        products: state?.products.map((product, index) => {
          if (index !== action.payload?.productIndex) return product;

          return {
            ...product,
            productImages: [
              ...product?.productImages?.map((productImage) => {
                if (
                  productImage?.imageFileName !== action.payload.imageFileName
                )
                  return productImage;

                return {
                  ...productImage,
                  contentSlot: action.payload.slotSelectedID,
                };
              }),
            ],
          };
        }),
      };

    case appConstants.SUBMIT_FORM:
      return {
        ...state,
        products: state?.products.map((product) => {
          if (product.productCode !== action.payload?.productCode) return product;
          return action.payload;
        })
      }


    default:
      return state;
  }
};

export default appReducer;
