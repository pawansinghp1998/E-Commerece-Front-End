import React, { createContext, FC, useContext, useState } from "react"

interface IProductFilters {
  sort: string | null
  brands: string | null
  fabric: string | null
}

export const initialProductFilters: IProductFilters = {
  sort: null,
  brands: null,
  fabric: null,
}

interface IProductFilterContext {
  productFilters: IProductFilters
  setProductFilters: (value: IProductFilters) => void
}

export const ProductFilterContext = createContext<any>(null)

export const useFilter = () => {
  return useContext(ProductFilterContext)
}

export const ProductFilterProvider: FC = ({ children }) => {
  const [productFilters, setProductFilters] = useState<IProductFilters>(initialProductFilters)

  return (
    <ProductFilterContext.Provider
      value={{
        productFilters,
        setProductFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  )
}
