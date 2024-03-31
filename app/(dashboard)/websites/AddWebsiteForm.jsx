'use client'

import { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, TextField, CircularProgress, Box } from '@mui/material'
import UseApi from '@/app/components/UseApi'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

export default function AddWebsiteForm() {
 let [name, setName] = useState(null)
 let [domain, setDomain] = useState(null)
 let [isOpen, setIsOpen] = useState(false)
 let [isLoading, setIsLoading] = useState(false)
 let router = useRouter()

 async function handleAddWebsite(e) {
  e.preventDefault()
  setIsLoading(true)
  let errors = []
  let request = await UseApi(`website/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, domain: domain }) })
  if (request.status === 200) {
   enqueueSnackbar('Website added successfully', { variant: 'success' })
   router.push(`/website/${request.data.id}/edit`)
  } else if (request.status !== 401) {
   errors = request.data
  }
  if (Object.keys(errors).length > 0) {
   enqueueSnackbar(errors.join('\n'), { variant: 'error', style: { whiteSpace: 'pre-line' } })
  }
  setIsLoading(false)
 }

 return (
  <>
   <Dialog open={isOpen} onClose={() => { setIsOpen(false) }} fullWidth maxWidth='xs'>
    <DialogTitle>Add Website</DialogTitle>
    <DialogContent>
     <Box component='form' onSubmit={handleAddWebsite}>
      <TextField name='name' label='Name' margin='normal' placeholder='My Website' onChange={(e) => { setName(e.target.value) }} required fullWidth autoFocus />
      <TextField name='domain' label='Domain' margin='normal' placeholder='example.com' onChange={(e) => { setDomain(e.target.value) }} required fullWidth autoFocus />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }} disabled={isLoading}>{isLoading ? <CircularProgress size={24} /> : 'Submit'}</Button>
     </Box>
    </DialogContent>
   </Dialog>
   <Button variant='contained' onClick={() => { setIsOpen(true) }} sx={{ mb: 1 }}>Add Website</Button>
  </>
 )
}