'use client'

import LineChart from '@/app/(dashboard)/LineChart'
import DetailsTable from '@/app/(dashboard)/DetailsTable'
import { Unstable_Grid2 as Grid } from '@mui/material'

export default function HomeCharts() {
 let endDate = (new Date()).toISOString()
 let startDate = (new Date((new Date()).getTime() - (24 * 60 * 60 * 1000))).toISOString()

 return (
  <Grid container spacing={2}>
   <Grid xs={12}>
    <LineChart startDate={startDate} endDate={endDate} />
   </Grid>
   <Grid xs={12}>
    <DetailsTable startDate={startDate} endDate={endDate} />
   </Grid>
  </Grid>
 )
}