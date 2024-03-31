'use client'

import { Box, Button } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

export default function TrackingCodeTab(params) {

 let trackingCode = `<script async defer src='${location.protocol}//${location.host}/script.js' data-website-id='${params.website.id}'></script>`

 function copyToClipboard() {
  navigator.clipboard.writeText(trackingCode)
  enqueueSnackbar('Tracking code copied to clipboard', { variant: 'success' })
 }

 return (<>
  <Box sx={{ p: 2, border: '1px solid', borderRadius: 1, borderColor: 'primary.main', bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'grey.900' : '') }}>
   <code>{trackingCode}</code>
  </Box>
  <Button onClick={copyToClipboard} fullWidth variant='contained' sx={{ mt: 2 }}>Copy</Button>
 </>)
}