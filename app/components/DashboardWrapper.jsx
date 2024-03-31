'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Menu, MenuItem, Button, Tooltip } from '@mui/material'
import { Menu as MenuIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, PersonOutline as PersonIcon, Analytics as AnalyticsIcon } from '@mui/icons-material'
import Link from 'next/link'
import { SnackbarProvider } from 'notistack'

export default function DashboardWrapper({ children }) {
 let [mounted, setMounted] = useState(false)
 let [mode, setMode] = useState('dark')
 let [mainMenuAnchor, setMainMenuAnchor] = useState(null)
 let [userMenuAnchor, setUserMenuAnchor] = useState(null)
 let [isOpenMainMenu, setIsOpenMainMenu] = useState(false)
 let [isOpenUserMenu, setIsOpenUserMenu] = useState(false)

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

 window.addEventListener('resize', function () {
  setIsOpenMainMenu(false)
  setIsOpenUserMenu(false)
 })

 function modeToggle() {
  let newMode = mode === 'light' ? 'dark' : 'light'
  setMode(newMode)
  localStorage.setItem('miso.mode', newMode)
 }

 const theme = createTheme({
  palette: {
   primary: {
    main: '#21A0A0',
   },
   mode: mode
  }
 })

 function mainMenuToggle(e) {
  setIsOpenMainMenu(!isOpenMainMenu)
  isOpenMainMenu === true ? setMainMenuAnchor(null) : setMainMenuAnchor(e.currentTarget)
 }
 function userMenuToggle(e) {
  setIsOpenUserMenu(!isOpenUserMenu)
  isOpenUserMenu === true ? setUserMenuAnchor(null) : setUserMenuAnchor(e.currentTarget)
 }

 function logout() {
  localStorage.removeItem('miso.auth')
  location = '/login'
 }

 const mainMenu = [{ title: 'Dashboard', path: '/' }, { title: 'Websites', path: '/websites' }]
 const userMenu = [{ title: 'Profile', path: '/profile' }]

 return (
  <ThemeProvider theme={theme}>
   <CssBaseline />
   <AppBar>
    <Container maxWidth='xl'>
     <Toolbar disableGutters>
      <Typography variant='h6' component={Link} scroll={false} href='/' sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>Miso</Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
       <IconButton size='large' onClick={mainMenuToggle} sx={{ color: 'inherit' }}><MenuIcon /></IconButton>
       <Menu anchorEl={mainMenuAnchor} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={isOpenMainMenu} onClose={mainMenuToggle} sx={{ display: { xs: 'block', md: 'none' } }}>
        {mainMenu.map((link) => (
         <MenuItem key={link.title} component={Link} scroll={false} href={link.path}>
          <Typography textAlign='center' onClick={mainMenuToggle} sx={{ color: 'inherit', textDecoration: 'none' }}>{link.title}</Typography>
         </MenuItem>
        ))}
       </Menu>
      </Box>
      <Typography variant='h5' component={Link} scroll={false} href='/' sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>Miso</Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
       {mainMenu.map((link) => (
        <Button key={link.title} component={Link} scroll={false} href={link.path} sx={{ my: 2, color: 'inherit', display: 'block' }}>{link.title}</Button>
       ))}
      </Box>
      <IconButton onClick={modeToggle} sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'inherit' }}>{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>
      <Box sx={{ flexGrow: 0 }}>
       <Tooltip>
        <IconButton onClick={userMenuToggle} sx={{ color: 'inherit' }}>
         <PersonIcon />
        </IconButton>
       </Tooltip>
       <Menu sx={{ mt: '45px' }} anchorEl={userMenuAnchor} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isOpenUserMenu} onClose={userMenuToggle}>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}><IconButton onClick={modeToggle} sx={{ display: { xs: 'flex', md: 'none' }, color: 'inherit' }} disableGutters>{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton></Container>
        {userMenu.map((link) => (
         <MenuItem key={link.title} scroll={false} href={link.path} component={Link} onClick={userMenuToggle}>
          <Typography textAlign='center' sx={{ color: 'inherit', textDecoration: 'none' }}>{link.title}</Typography>
         </MenuItem>
        ))}
        <MenuItem onClick={logout}>
         <Typography textAlign='center' sx={{ color: 'inherit', textDecoration: 'none' }}>Logout</Typography>
        </MenuItem>
       </Menu>
      </Box>
     </Toolbar>
    </Container>
   </AppBar>
   <Container sx={{ mt: '100px' }}>
    {children}
    <SnackbarProvider maxSnack={5} />
   </Container>
  </ThemeProvider>
 )
}