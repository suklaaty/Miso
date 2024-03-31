'use client'

import { Button, CircularProgress, TextField, Box, InputAdornment, IconButton, Container, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import UseApi from '@/app/components/UseApi'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

export default function EditProfileForm() {
 let [id, setId] = useState('')
 let [email, setEmail] = useState('')
 let [newPassword, setNewPassword] = useState('')
 let [currentPassword, setCurrentPassword] = useState('')
 let [showPassword, setShowPassword] = useState(false)
 let [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
  (async function () {
   let request = await UseApi(`user`)
   if (request.status === 200) {
    setId(request.data.id)
    setEmail(request.data.email)
    setIsLoading(false)
   } else if (request.status !== 401) {
    setIsNotificationOpen(true)
   }
  })()
 }, [])

 async function handleEditUser(e) {
  e.preventDefault()
  setIsLoading(true)
  let errors = []
  let request = await UseApi(`user/edit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id, email: email, newPassword: newPassword, currentPassword: currentPassword }) })
  if (request.status === 200) {
   setEmail(request.data.email)
   localStorage.setItem('miso.auth', request.data.token)
   enqueueSnackbar('Profile updated successfully', { variant: 'success' })
  } else if (request.status !== 401) {
   errors = request.data
  }
  if (Object.keys(errors).length > 0) {
   enqueueSnackbar(errors.join('\n'), { variant: 'error', style: { whiteSpace: 'pre-line' } })
  }
  setIsLoading(false)
 }

 return (
  <Container maxWidth='xs' sx={{ mt: 10 }} disableGutters>
   <Typography variant='h4' sx={{ mb: 2, pb: 1, fontWeight: 'bold', textAlign: 'center' }}>Edit Profile | Miso</Typography>
   {id === '' ? '' : (<>
    <Box component='form' onSubmit={handleEditUser}>
     <TextField name='id' label='ID' margin='normal' value={id} InputProps={{ readOnly: true }} fullWidth autoFocus />
     <TextField name='Email' label='Email' autoComplete='email' type='email' margin='normal' value={email} onChange={(e) => { setEmail(e.target.value) }} required fullWidth autoFocus></TextField>
     <TextField name='newPassword' label='New Password' autoComplete='new-password' type={showPassword ? 'text' : 'password'} margin='normal' onChange={(e) => { setNewPassword(e.target.value) }} fullWidth autoFocus InputProps={{ endAdornment: (<InputAdornment position='end'><IconButton onClick={() => { setShowPassword(!showPassword) }} edge='end'>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }}></TextField>
     <TextField name='currentPassword' label='Current Password' autoComplete='password' type={showPassword ? 'text' : 'password'} margin='normal' onChange={(e) => { setCurrentPassword(e.target.value) }} required fullWidth autoFocus InputProps={{ endAdornment: (<InputAdornment position='end'><IconButton onClick={() => { setShowPassword(!showPassword) }} edge='end'>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }}></TextField>
     <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }} disabled={isLoading}>{isLoading ? <CircularProgress size={24} /> : 'Submit'}</Button>
    </Box>
   </>)}
  </Container>
 )
}