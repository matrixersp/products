import React, { useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import Dialog from "../Dialog";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const UploadImage = ({ handleUploadImages = () => {}, products }) => {
  const [duplicateImageNames, setDuplicateImageNames] = useState([]);
  const [nonDuplicateImages, setNonDuplicateImages] = useState([]);
  const [warningDialogOpen, setAlertDialogOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const onUploadImage = (files) => {
    const fileList = Array.from(files);
    const images = fileList.map((image) => {
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
        imageFile: image,
        imageFileName: image?.name,
        imageUrl: null,
      };
    });

    const existingImageNames = [];
    const newImages = [];
    const productImages = products
      .map(product => product.productImages)
      .reduce((acc, image) => acc.concat(image), []);

    images.forEach(image => {
      const imageExists = productImages.some(existingImage => 
        existingImage.imageFileName === image.imageFileName
      );
      if(imageExists) existingImageNames.push(image.imageFileName);
      else newImages.push(image);
    })

    setNonDuplicateImages(newImages);

    if(existingImageNames.length > 0) {
      setDuplicateImageNames(existingImageNames);
      setAlertDialogOpen(true);
    } else {
      handleUploadImages(newImages);
      // should wait for the upload action to finish before displaying the toast
      // (and maybe display an error if the upload failed)
      setSuccessToastOpen(true);
    }
  };

  const handleWarningDialogClose = () => {
    setAlertDialogOpen(false);
  }

  const handleWarningDialogConfirm = () => {
    if(nonDuplicateImages.length > 0) {
      handleUploadImages(nonDuplicateImages);
      // should wait for the upload action to finish before displaying the toast
      setSuccessToastOpen(true);
    }
    setAlertDialogOpen(false);
  }

  const handleDrop = (e) => {
    e.nativeEvent.preventDefault();
    if (!e) return;
    const files = e.nativeEvent.dataTransfer.files;
    onUploadImage(files);
  };

  const browseFiles = (e) => {
    if (!e) return;
    const files = e.currentTarget.files;
    onUploadImage(files);
    e.target.value = null;
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Paper>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "normal",
                marginBottom: "1rem",
              }}
            >
              Drag & Drop Images here
            </h3>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "normal",
                marginBottom: "1rem",
              }}
            >
              or
            </p>
            <Button
              size="medium"
              variant="outlined"
              component="label"
              color="primary"
            >
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => browseFiles(e)}
              />
              Browse files
            </Button>
          </div>
        </Paper>
      </Grid>
      <Dialog
        imageNames={duplicateImageNames}
        open={warningDialogOpen}
        onClose={handleWarningDialogClose}
        onConfirm={handleWarningDialogConfirm}
      />
      <Snackbar
        open={successToastOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessToastOpen(false)}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
      > 
        <Alert
          onClose={() => setSuccessToastOpen(false)}
          elevation={6}
          variant="filled"
          severity="success"
        >
          Images successfully uploaded.
        </Alert>
      </Snackbar>
    </Grid>
  );
};
export default UploadImage;
