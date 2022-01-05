import React from "react";
import MediaCard from "../MediaCard";
import { Box, Grid, Button, FormLabel } from "@material-ui/core";
import { useFormik, FormikProvider } from "formik";
import ProductInputs from "../ProductInputs";
import { productSchema } from "../../schema";

export default function ProductCard({
  productIndex = "",
  product = null,
  categories,
  contentSlots,
  handleChangeProductCode = () => {},
  handleChangeProductName = () => {},
  handleChangeProductCategory = () => {},
  handleChangeSlot = () => {},
  handleSubmitForm = () => {},
}) {
  const formik = useFormik({
    initialValues: {
      productCode: product?.productCode || "",
      newProductCode: product?.newProductCode || "",
      productName: product?.productName || "",
      productCategory: product?.productCategory || null,
      productExisting: product?.productExisting,
      productImages: product?.productImages || [],
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmitForm(values);
    },
  });

  const getAvailableSlots = (productImage) => {
    const otherContentSlots = product.productImages
      .filter((image) => image.imageFileName !== productImage.imageFileName)
      .map((image) => image.contentSlot);

    return contentSlots.filter(
      (contentSlot) => !otherContentSlots.includes(contentSlot.id)
    );
  };
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <ProductInputs
            productIndex={productIndex}
            formik={formik}
            categories={categories}
            handleChangeProductCode={handleChangeProductCode}
            handleChangeProductName={handleChangeProductName}
          />
          <Button
            variant="contained"
            size="medium"
            color="primary"
            type="submit"
          >
            Save
          </Button>

          <Grid component="div" container spacing={2}>
            <Grid component="div" item xl={10} lg={10} md={12} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Grid component="div" container spacing={2}>
                  {formik.values.productImages.map((productImage, index) => (
                    <Grid
                      key={productImage.id}
                      component="div"
                      item
                      xl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                    >
                      <MediaCard
                        formik={formik}
                        productCode={formik.values.productCode}
                        productImageIndex={index}
                        productImage={productImage}
                        contentSlots={getAvailableSlots(productImage)}
                        productIndex={productIndex}
                        handleChangeSlot={handleChangeSlot}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <FormLabel style={{ color: "#f44336" }}>
              {formik.errors.productImages}
            </FormLabel>
          </Grid>
        </Box>
      </form>
    </FormikProvider>
  );
}
