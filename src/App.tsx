import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { themeOptions } from "theme/mui-theme-styles"
import "./App.scss"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Copyright } from "components/copyright"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProductFilterProvider } from "contexts/FilterProductContext"
import ProductList from "components/ProductList/ProductList"
import ProductDetails from "components/ProductDetails/ProductDetails"
import { collections } from "./data/collection"
import ReactJson from "react-json-view"
import { product } from "./data/product"

function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    setAppIsReady(true)
  }, [])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />,
    },
    {
      path: "/productId/*",
      element: <ProductDetails />,
    },
  ])

  if (!appIsReady) return null

  return (
    <ProductFilterProvider>
      <RouterProvider router={router} />
    </ProductFilterProvider>
  )
}

export default App
