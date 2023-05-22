import React from "react"
import { collections } from "../../data/collection"
import "./ProductDetails.scss"

const ProductDetails = () => {
  const urlPath = window.location.pathname.split("/")
  const productId = urlPath[urlPath.length - 1]
  const productDetails = collections.find((item) => item.productId === +productId)
  return (
    <div className="product-details">
      {!!productDetails && (
        <div className="product-list" key={productDetails.id}>
          <img src={productDetails.primaryImage.webpImages.mImage} className="product-image" alt="" />
          <div className="supplier-details">{productDetails.supplierName}</div>
          <div className="fabric-details">{productDetails.sareeFabric}</div>
          <div>
            <span className="list-price">{`Rs${productDetails.listingPrice} `}</span>
            <span className="mrp-price">{`Rs${productDetails.mrp} `}</span>
            <span className="discount">{`(${productDetails.discount}% OFF)`}</span>
          </div>
          <div className="product-name">{productDetails.name}</div>
          {productDetails.availableQty < 10 && <div className="few-left">Only Few Left!</div>}
        </div>
      )}
    </div>
  )
}

export default ProductDetails
