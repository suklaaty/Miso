'use client'

import UseApi from '@/app/components/UseApi'
import { useEffect, useState } from 'react'
import { Container, Typography, Box, Tab, Tabs } from '@mui/material'
import DataTab from '@/app/(dashboard)/website/[id]/edit/DataTab'
import TrackingCodeTab from '@/app/(dashboard)/website/[id]/edit/TrackingCodeTab'
import DetailsTab from '@/app/(dashboard)/website/[id]/edit/DetailsTab'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

function TabPanel({ children, value, tab, ...other }) {
 return (<Box hidden={value !== tab} {...other}>{children}</Box>)
}

export default function EditWebsite({ websiteId }) {
 let [website, setWebsite] = useState(null)
 let [isLoading, setIsLoading] = useState(true)
 let [activeTab, setActiveTab] = useState(0)
 let router = useRouter()

 useEffect(() => {
  (async function () {
   let request = await UseApi(`website?id=${websiteId}&option=details`)
   if (request.status === 200) {
    setWebsite(request.data)
    document.title = `Edit ${request.data.name} | Miso`
    setIsLoading(false)
   } else if (request.status === 404) {
    enqueueSnackbar('Website not found', { variant: 'error' })
    router.push('/websites')
   } else if (request.status !== 401) {
    enqueueSnackbar('Something unexpected happened', { variant: 'error' })
   }
  })()
 }, [websiteId, router])

 return (
  <Container maxWidth='sm' disableGutters>
   {isLoading ? '' : (
    <>
     <Typography variant='h4' sx={{ mb: 2, pb: 1, fontWeight: 'bold', textAlign: 'center' }}>Edit {website.name}</Typography>
     <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={activeTab} onChange={(event, newValue) => { setActiveTab(newValue) }}>
       <Tab label='Details'></Tab>
       <Tab label='Tracking Code'></Tab>
       <Tab label='Data'></Tab>
      </Tabs>
     </Box>
     <TabPanel value={activeTab} tab={0}>
      <DetailsTab website={website} />
     </TabPanel>
     <TabPanel value={activeTab} tab={1}>
      <TrackingCodeTab website={website} />
     </TabPanel>
     <TabPanel value={activeTab} tab={2}>
      <DataTab website={website} />
     </TabPanel>
    </>
   )}
  </Container >
 )
}