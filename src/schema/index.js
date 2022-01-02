import { object, string, array, bool } from "yup";

export const productSchema = object({
  newProductCode: string().required("required"),
  productName: string().required("required"),
  productImages: array(
    object().shape({
      contentSlot: string()
        .required("Content slot is required")
        .test("returnValue", "Content slot is required", (value) => {
          return value && value !== "-1";
        }),
    })
  ),
});
