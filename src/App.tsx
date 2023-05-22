import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import "./App.scss"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProductFilterProvider } from "contexts/FilterProductContext"
import ProductList from "components/ProductList/ProductList"
import ProductDetails from "components/ProductDetails/ProductDetails"

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
