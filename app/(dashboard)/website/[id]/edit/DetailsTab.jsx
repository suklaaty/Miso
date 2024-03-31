'use client'

import { Button, CircularProgress, TextField, Box, FormControlLabel, Switch, InputAdornment, IconButton } from '@mui/material'
import { Replay } from '@mui/icons-material'
import { useState } from 'react'
import UseApi from '@/app/components/UseApi'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

export default function DetailsTab(params) {
 let [website, setWebsite] = useState(params.website)
 let [name, setName] = useState(website.name)
 let [domain, setDomain] = useState(website.domain)
 let [enablePublic, setEnablePublic] = useState(website.public)
 let [isLoading, setIsLoading] = useState(false)
 let router = useRouter()

 async function handleEditWebsite(e) {
  e.preventDefault()
  setIsLoading(true)
  let errors = []
  let request = await UseApi(`website/edit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: website.id, name: name, domain: domain, enablePublic: enablePublic }) })
  if (request.status === 200) {
   setWebsite(request.data)
   enqueueSnackbar('Website updated successfully', { variant: 'success' })
  } else if (request.status === 404) {
   enqueueSnackbar('Website not found', { variant: 'error' })
   router.push('/websites')
  } else if (request.status !== 401) {
   errors = request.data
  }
  if (Object.keys(errors).length > 0) {
   enqueueSnackbar(errors.join('\n'), { variant: 'error', style: { whiteSpace: 'pre-line' } })
  }
  setIsLoading(false)
 }

 async function handleRegenerateWebsitePublicId() {
  setIsLoading(true)
  let errors = []
  let request = await UseApi(`website/edit/public`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: website.id }) })
  if (request.status === 200) {
   setWebsite(request.data)
   enqueueSnackbar('Public Url updated successfully', { variant: 'success' })
  } else if (request.status === 404) {
   enqueueSnackbar('Website not found', { variant: 'error' })
   router.push('/websites')
  } else if (request.status !== 401) {
   errors = request.data
  }
  if (Object.keys(errors).length > 0) {
   enqueueSnackbar(errors.join('\n'), { variant: 'error', style: { whiteSpace: 'pre-line' } })
  }
  setIsLoading(false)
 }

 return (
  <Box component='form' onSubmit={handleEditWebsite}>
   <TextField name='id' label='ID' margin='normal' value={website.id} InputProps={{ readOnly: true }} fullWidth autoFocus />
   <TextField name='websiteName' label='Name' margin='normal' onChange={(e) => { setName(e.target.value) }} value={name} required fullWidth autoFocus />
   <TextField name='domain' label='Domain' margin='normal' onChange={(e) => { setDomain(e.target.value) }} value={domain} required fullWidth autoFocus />
   <FormControlLabel control={<Switch name='enable_public_url' />} label='Enable Public Url' onChange={(e) => { setEnablePublic(!enablePublic) }} checked={enablePublic}></FormControlLabel>
   {website.public && enablePublic ? <TextField name='publicUrl' label='Public Url' margin='normal' value={`${location.protocol}//${location.host}/p/${website.publicId}`} InputProps={{ readOnly: true, endAdornment: (<InputAdornment position='end'><IconButton onClick={handleRegenerateWebsitePublicId} edge='end' disabled={isLoading}><Replay /></IconButton></InputAdornment>) }} fullWidth autoFocus /> : ''}
   <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }} disabled={isLoading}>{isLoading ? <CircularProgress size={24} /> : 'Submit'}</Button>
  </Box>
 )
}