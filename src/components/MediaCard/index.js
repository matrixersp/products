import React from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  TextField,
} from "@material-ui/core";

export default function MediaCard({
  formik,
  productCode = "",
  productImageIndex = "",
  productImage = null,
  contentSlots = [],
  productIndex = "",
  handleChangeSlot = () => {},
}) {
  const errorMessages =
    productImage.hasError &&
    productImage.errorMessage?.validationMessages.map(
      (data) => data.validationMessages
    );

  const onSelectContentSlot = (_, slot) => {
    formik.setFieldValue(
      `productImages[${productImageIndex}].contentSlot`,
      slot ? slot?.id : ""
    );
    handleChangeSlot(productImage, slot, productIndex);
  };

  return (
    <Card
      style={{
        border: productImage.hasError ? "1px solid red" : "unset",
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          height="140"
          image={
            productImage.imageFile
              ? URL.createObjectURL(productImage.imageFile)
              : productImage.imageUrl
          }
        />
        <p>{productImage.imageFileName}</p>
        {productImage.hasError &&
          errorMessages.map((msg, idx) => (
            <Box key={idx + msg} marginTop={idx === 0 ? 2 : 1}>
              <Typography color="secondary">{msg}</Typography>
            </Box>
          ))}
        <Autocomplete
          fullWidth
          size="small"
          options={contentSlots || []}
          value={
            contentSlots.find(
              (contentSlot) => contentSlot?.id === productImage?.contentSlot
            ) || null
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Content Slot"
              variant="outlined"
              fullWidth
              name={`productImages[${productImageIndex}].contentSlot`}
              helperText={
                formik.touched.productImages?.[productImageIndex]?.contentSlot
                  ? formik.errors.productImages?.[productImageIndex]
                      ?.contentSlot
                  : ""
              }
              error={
                formik.touched.productImages?.[productImageIndex]
                  ?.contentSlot &&
                Boolean(
                  formik.errors.productImages?.[productImageIndex]?.contentSlot
                )
              }
            />
          )}
          getOptionLabel={(option) => option.name || ""}
          onChange={onSelectContentSlot}
        />
      </CardContent>
    </Card>
  );
}
