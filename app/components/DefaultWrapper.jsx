'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'

export default function DefaultWrapper({ children }) {
 const [mounted, setMounted] = useState(false)
 const [mode, setMode] = useState('dark')

 useEffect(() => {
  setMounted(true)
 }, [])

 if (!mounted) {
  return ''
 }

 if (localStorage.getItem('miso.mode') === null) {
  localStorage.setItem('miso.mode', 'dark')
 } else if (localStorage.getItem('miso.mode') !== mode) {
  setMode(localStorage.getItem('miso.mode', mode))
 }

 const theme = createTheme({
  palette: {
   primary: {
    main: '#21A0A0'
   },
   mode: mode
  }
 })

 return (
  <ThemeProvider theme={theme}>
   <CssBaseline />
   {children}
   <SnackbarProvider maxSnack={5} />
  </ThemeProvider>
 )
}