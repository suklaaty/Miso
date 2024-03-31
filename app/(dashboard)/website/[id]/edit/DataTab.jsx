'use client'

import UseApi from '@/app/components/UseApi'
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

export default function DataTab(params) {
 let website = params.website
 let [openReset, setOpenReset] = useState(false)
 let [confirmReset, setConfirmReset] = useState(null)
 let [openDelete, setOpenDelete] = useState(false)
 let [confirmDelete, setConfirmDelete] = useState(null)
 let [isLoading, setIsLoading] = useState(false)
 let router = useRouter()


 async function handleReset(e) {
  e.preventDefault()
  setIsLoading(true)
  let errors = []
  let request = await UseApi(`website/reset`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: website.id }) })
  if (request.status === 200) {
   enqueueSnackbar('Website data reset successfully', { variant: 'success' })
   setOpenReset(false)
   setConfirmReset(null)
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

 async function handleDelete(e) {
  e.preventDefault()
  setIsLoading(true)
  let errors = []
  let request = await UseApi(`website/delete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: website.id }) })
  if (request.status === 200) {
   enqueueSnackbar('Website deleted successfully', { variant: 'success' })
   router.push('/websites')
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
  <Box sx={{ display: 'grid', gap: 2 }}>
   <Box>
    <Dialog open={openReset} onClose={() => { setOpenReset(false), setConfirmReset(null) }} fullWidth maxWidth='xs'>
     <DialogTitle>Reset Data</DialogTitle>
     <DialogContent>
      <Box component='form' onSubmit={handleReset}>
       <Typography>{`To confirm, type "${website.name}" in the box below`}</Typography>
       <TextField name='confirmReset' onChange={(e) => { setConfirmReset(e.target.value) }} placeholder={website.name} required fullWidth autoFocus />
       <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }} disabled={isLoading || confirmReset !== website.name}>{isLoading ? <CircularProgress size={24} /> : 'Reset Data'}</Button>
      </Box>
     </DialogContent>
    </Dialog>
    <Typography sx={{ fontWeight: 'bold' }}>Reset Data</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, p: 2, border: '1px solid', borderRadius: 1, borderColor: 'primary.main', bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'grey.900' : '') }}>
     <Typography>Reset all analytics associated with this website. Leaves settings unchanged.</Typography>
     <Button variant='contained' onClick={() => { setOpenReset(!openReset) }}>Reset</Button>
    </Box>
   </Box>
   <Box>
    <Dialog open={openDelete} onClose={() => { setOpenDelete(false), setConfirmDelete(null) }} fullWidth maxWidth='xs'>
     <DialogTitle>Delete Website</DialogTitle>
     <DialogContent>
      <Box component='form' onSubmit={handleDelete}>
       <Typography>{`To confirm, type "${website.name}" in the box below`}</Typography>
       <TextField name='confirmDelete' onChange={(e) => { setConfirmDelete(e.target.value) }} placeholder={website.name} required fullWidth autoFocus />
       <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }} disabled={isLoading || confirmDelete !== website.name}>{isLoading ? <CircularProgress size={24} /> : 'Delete Website'}</Button>
      </Box>
     </DialogContent>
    </Dialog>
    <Typography sx={{ fontWeight: 'bold' }}>Delete Website</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, p: 2, border: '1px solid', borderRadius: 1, borderColor: 'primary.main', bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'grey.900' : '') }}>
     <Typography>Completely delete the website and all records associated with it.</Typography>
     <Button variant='contained' onClick={() => { setOpenDelete(!openDelete) }}>Delete</Button>
    </Box>
   </Box>
  </Box>
 )
}