'use client'

import UseApi from '@/app/components/UseApi'
import { Box, Paper, Skeleton, useTheme } from '@mui/material'
import { VectorMap } from '@react-jvectormap/core'
import { worldMill } from '@react-jvectormap/world'
import { useEffect, useState } from 'react'

export default function CountriesMap({ websiteId, startDate, endDate }) {
 let [isLoading, setIsLoading] = useState(true)
 let [stats, setStats] = useState(null)
 let theme = useTheme()

 useEffect(() => {
  (async function () {
   setIsLoading(true)
   let request = await UseApi(`website?id=${websiteId}&option=countryIso&start=${startDate}&end=${endDate}`)
   if (request.status === 200) {
    setStats(request.data)
    setIsLoading(false)
   }
  })()
 }, [websiteId, startDate, endDate])

 function handleTooltip(e, el, code) {
  let key = Object.keys(stats).find(x => stats[x].option === code)
  let visitors = key !== undefined ? stats[key].views : 0
  el.html(el.html() + ': ' + visitors + ' Vistors')
 }

 return (
  <Paper elevation={1}>
   {isLoading ? <Skeleton variant='rectangular' animation='wave' height={507.5} /> : (
    <Box sx={{ p: 2, height: 507.5 }}><VectorMap map={worldMill} backgroundColor='0' onRegionTipShow={handleTooltip} regionStyle={{ initial: { fill: theme.palette.primary.main } }} /></Box>
   )}
  </Paper>
 )
}