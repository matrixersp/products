import React, { useCallback } from "react";
import { TextField, Grid } from "@material-ui/core";
import debounce from "../../utils/functions/debounce";

export default function ProductInputs(props) {
  const {
    productIndex,
    formik,
    handleChangeProductCode = () => {},
    handleChangeProductName = () => {},
  } = props;

  const debouncedHandlerProductCode = useCallback(
    debounce(handleChangeProductCode, 500),
    []
  );

  const debouncedHandlerProductName = useCallback(
    debounce(handleChangeProductName, 500),
    []
  );

  return (
    <Grid component="div" container spacing={2}>
      <Grid component="div" item xl={3} lg={3} md={3} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Code"
          variant="outlined"
          size="small"
          name="newProductCode"
          value={formik.values.newProductCode}
          helperText={
            formik.touched.newProductCode ? formik.errors.newProductCode : ""
          }
          error={
            formik.touched.newProductCode &&
            Boolean(formik.errors.newProductCode)
          }
          onChange={(e) => {
            formik.setFieldValue("newProductCode", e.target.value);
            debouncedHandlerProductCode(productIndex, e.target.value);
          }}
        />
      </Grid>
      <Grid component="div" item xl={3} lg={3} md={3} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          size="small"
          name="productName"
          value={formik.values.productName}
          helperText={
            formik.touched.productName ? formik.errors.productName : ""
          }
          error={
            formik.touched.productName && Boolean(formik.errors.productName)
          }
          onChange={(e) => {
            formik.setFieldValue("productName", e.target.value);
            debouncedHandlerProductName(productIndex, e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}
