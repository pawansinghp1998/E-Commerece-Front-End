import { collections } from "../../data/collection"
import React, { useState, useEffect } from "react"
import { useFilter } from "contexts/FilterProductContext"
import { Select } from "antd"
import { NavLink } from "react-router-dom"
import "./ProductList.scss"

interface ISelectData {
  label: string
  value: string
  id: number
}
const ProductList = () => {
  const [collectionData, setCollectionData] = useState(collections)
  const { productFilters, setProductFilters } = useFilter()
  const [filterBrandsOption, setFilterBrandsOption] = useState<ISelectData[]>([])
  const [filterFabricOption, setFilterFabricOption] = useState<ISelectData[]>([])

  const sortOptions = [
    { label: "LowToHigh", value: "LowToHigh", id: 1 },
    { label: "HighToLow", value: "HighToLow", id: 2 },
    { label: "A-Z (Ascending)", value: "A-Z", id: 1 },
    { label: "Z-A (Descending)", value: "Z-A", id: 2 },
  ]

  useEffect(() => {
    const brandsOptions: ISelectData[] = []
    const fabricOptions: ISelectData[] = []
    if (collections.length > 0) {
      collections.forEach((item) => {
        if (!brandsOptions.find((brand) => brand?.label === item.supplierName)) {
          brandsOptions.push({ label: item.supplierName, value: item.supplierName, id: item.id })
        }
        if (!fabricOptions.find((fabric) => fabric?.label === item.sareeFabric)) {
          fabricOptions.push({ label: item.sareeFabric, value: item.sareeFabric, id: item.id })
        }
      })
      setFilterBrandsOption(brandsOptions)
      setFilterFabricOption(fabricOptions)
    }
  }, [collections])

  useEffect(() => {
    let temp = collections.slice()
    if (productFilters.brands) {
      temp = temp.filter((item) => item.supplierName === productFilters.brands)
    }
    if (productFilters.fabric) {
      temp = temp.filter((item) => item.sareeFabric === productFilters.fabric)
    }
    if (productFilters.sort === "A-Z") {
      temp = temp.sort((a, b) => (a.supplierName > b.supplierName ? 1 : -1))
    }
    if (productFilters.sort === "Z-A") {
      temp = temp.sort((a, b) => (a.supplierName > b.supplierName ? -1 : 1))
    }
    if (productFilters.sort === "LowToHigh") {
      temp = temp.sort((a, b) => (a.listingPrice > b.listingPrice ? 1 : -1))
    }
    if (productFilters.sort === "HighToLow") {
      temp = temp.sort((a, b) => (a.listingPrice > b.listingPrice ? -1 : 1))
    }
    setCollectionData(temp)
  }, [productFilters])

  const handleSortOrder = (value: string) => {
    setProductFilters({ ...productFilters, sort: value })
  }
  const handleBrandsFilter = (value: string) => {
    setProductFilters({ ...productFilters, brands: value })
  }
  const handleFabricFilter = (value: string) => {
    setProductFilters({ ...productFilters, fabric: value })
  }

  return (
    <div>
      <div className="header-section">
        <Select placeholder="Sort Criteria" value={productFilters.sort} allowClear options={sortOptions} onChange={(value: string) => handleSortOrder(value)} />
        <Select placeholder="Choose Brands" value={productFilters.brands} allowClear options={filterBrandsOption} onChange={(value: string) => handleBrandsFilter(value)} />
        <Select placeholder="Choose Fabric" allowClear value={productFilters.fabric} options={filterFabricOption} onChange={(value: string) => handleFabricFilter(value)} />
      </div>
      <div className="product-listing-page">
        {collectionData?.length > 0 &&
          collectionData.map((item) => {
            return (
              <NavLink to={`/productId/${item.productId}`} key={item.id}>
                <div className="product-list" key={item.id}>
                  <img src={item.primaryImage.webpImages.sImage} className="product-image" alt="" />
                  <div className="supplier-details">{item.supplierName}</div>
                  <div className="fabric-details">{item.sareeFabric}</div>
                  <div>
                    <span className="list-price">{`Rs${item.listingPrice} `}</span>
                    <span className="mrp-price">{`Rs${item.mrp} `}</span>
                    <span className="discount">{`(${item.discount}% OFF)`}</span>
                  </div>
                  {item.availableQty < 10 && <div className="few-left">Only Few Left!</div>}
                </div>
              </NavLink>
            )
          })}
      </div>
    </div>
  )
}

export default ProductList
