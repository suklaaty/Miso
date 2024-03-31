'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, Typography, Box, TextField, Button, IconButton, InputAdornment, Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'
import UseApi from '@/app/components/UseApi'

export default function LoginForm() {
 let [email, setEmail] = useState(null)
 let [password, setPassword] = useState(null)
 let [showPassword, setShowPassword] = useState(false)
 let [isLoading, setIsLoading] = useState(false)
 let [error, setError] = useState(false)

 async function handleLogin(e) {
  setIsLoading(true)
  e.preventDefault()
  let errors = []
  let request = await UseApi('login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, password: password }) })
  if (request.status === 200) {
   localStorage.setItem('miso.auth', request.data)
   location = '/'
  } else {
   errors = request.data
  }
  if (Object.keys(errors).length > 0) {
   setError(errors.join('\n'))
  }
  setIsLoading(false)
 }

 return (
  <Container maxWidth='xs' sx={{ mt: 10 }} disableGutters>
   <Typography variant='h4' sx={{ mb: 2, pb: 1, fontWeight: 'bold', textAlign: 'center' }}>Login | Miso</Typography>
   <Box component='form' onSubmit={handleLogin}>
    <TextField name='Email' label='Email' autoComplete='email' type='email' margin='normal' onChange={(e) => { setEmail(e.target.value) }} required fullWidth autoFocus></TextField>
    <TextField name='Password' label='Password' autoComplete='password' type={showPassword ? 'text' : 'password'} margin='normal' onChange={(e) => { setPassword(e.target.value) }} required fullWidth autoFocus InputProps={{ endAdornment: (<InputAdornment position='end'><IconButton onClick={() => { setShowPassword(!showPassword) }} edge='end'>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }}></TextField>
    <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }} disabled={isLoading}>{isLoading ? <CircularProgress size={24} /> : 'Login'}</Button>
    {error ? <Alert severity='error' sx={{ whiteSpace: 'pre-line', mt: 2 }} variant='filled'>{error}</Alert> : ''}
   </Box >
  </Container >
 )
}