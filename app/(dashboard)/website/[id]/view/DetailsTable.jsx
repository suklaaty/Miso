'use client'

import { Box, Divider, Unstable_Grid2 as Grid, Paper, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import DetailsTablePopup from '@/app/(dashboard)/website/[id]/view/DetailsTablePopup'
import UseApi from '@/app/components/UseApi'

export default function DetailsTable({ websiteId, option, startDate, endDate, title }) {
 let [isLoading, setIsLoading] = useState(true)
 let [stats, setStats] = useState(null)

 useEffect(() => {
  (async function () {
   setIsLoading(true)
   let request = await UseApi(`website?id=${websiteId}&option=${option}&limit=10&start=${startDate}&end=${endDate}`)
   if (request.status === 200) {
    setStats(request.data)
    setIsLoading(false)
   }
  })()
 }, [websiteId, startDate, endDate, option])

 let mainTable = stats?.map((option, i) => (
  <div key={i}>
   <Grid container xs={12} sx={{ px: 2, py: 1 }}>
    <Grid xs={10}><Typography noWrap>{option.option}</Typography></Grid>
    <Grid xs={2}><Typography sx={{ textAlign: 'right' }}>{option.views}</Typography></Grid>
   </Grid>
   <Divider />
  </div>
 ))

 return (
  <Paper elevation={1}>
   {isLoading ? <Skeleton variant='rectangular' animation='wave' height={507.5} /> : (
    <>
     <Box height={455}>
      <Grid container xs={12} sx={{ px: 2, py: 1 }}>
       <Grid xs={10}><Typography sx={{ fontWeight: 'bold' }}>{title}</Typography></Grid>
       <Grid xs={2}><Typography sx={{ textAlign: 'right', fontWeight: 'bold' }}>Views</Typography></Grid>
      </Grid>
      <Divider />
      {mainTable}
     </Box>
     <Box textAlign='center' sx={{ px: 2, py: 1 }}>
      <DetailsTablePopup websiteId={websiteId} option={option} startDate={startDate} endDate={endDate} title={title} />
     </Box>
    </>
   )}
  </Paper>
 )
}