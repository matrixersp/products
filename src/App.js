import React, { useEffect } from "react";
import "./styles.css";
import ProductCard from "./components/ProductCard";
import Upload from "./components/Upload";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveProduct,
  uploadProduct,
  getContentSlots,
  changeContentSlot,
  changeProductCategory,
  changeProductName,
  changeProductCode,
} from "./actions";
import { images, contentSlots } from "./data";

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => [...state.product?.products]);

  useEffect(() => {
    dispatch(retrieveProduct(images));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContentSlots(contentSlots));
  }, [dispatch]);

  const handleUploadImages = (productImages) => {
    dispatch(uploadProduct(productImages));
  };

  const handleChangeProductCode = (productIndex, productCode) => {
    dispatch(changeProductCode(productIndex, productCode));
  };

  const handleChangeProductName = (productIndex, productName) => {
    dispatch(changeProductName(productIndex, productName));
  };

  const handleChangeProductCategory = (productIndex, productCategory) => {
    dispatch(changeProductCategory(productIndex, productCategory));
  };

  const handleChangeSlot = (productImage, slotSelected, productIndex) => {
    const imageFileName = productImage?.imageFileName ?? null;
    const slotSelectedID = slotSelected?.id ?? null;
    dispatch(changeContentSlot(imageFileName, slotSelectedID, productIndex));
  };

  return (
    <div className="App">
      <div>
        {(products || []).map((product, index) => (
          <div key={index}>
            <h1 style={{ display: "flex", justifyContent: "flex-start" }}>
              Product # {index + 1}
            </h1>
            <ProductCard
              productIndex={index}
              product={product}
              contentSlots={contentSlots}
              key={index}
              handleChangeProductCode={handleChangeProductCode}
              handleChangeProductName={handleChangeProductName}
              handleChangeProductCategory={handleChangeProductCategory}
              handleChangeSlot={handleChangeSlot}
            />
          </div>
        ))}
      </div>
      <Upload handleUploadImages={handleUploadImages} products={products || []}/>
    </div>
  );
}
