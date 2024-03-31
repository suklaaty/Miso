import UseApi from '@/app/components/UseApi'
import { Box, Unstable_Grid2 as Grid, Paper, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function TopStats({ websiteId, startDate, endDate }) {
 let [isLoading, setIsLoading] = useState(true)
 let [stats, setStats] = useState(null)

 useEffect(() => {
  (async function () {
   setIsLoading(true)
   let request = await UseApi(`website?id=${websiteId}&option=top_stats&start=${startDate}&end=${endDate}`)
   if (request.status === 200) {
    setStats(request.data)
    setIsLoading(false)
   }
  })()
 }, [websiteId, startDate, endDate])

 return (
  <Paper elevation={1}>
   {isLoading ? <Skeleton variant='rectangular' animation='wave' height={90} /> : (
    <Box minHeight={98}>
     <Grid container spacing={2} textAlign='center' sx={{ px: 2, py: 1, justifyContent: 'space-evenly' }}>
      <Grid sm={3} xs={6}>
       <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{stats.views}</Typography>
       <Typography sx={{ fontWeight: 'bold' }}>VIEWS</Typography>
      </Grid>
      <Grid sm={3} xs={6}>
       <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{stats.visitors}</Typography>
       <Typography sx={{ fontWeight: 'bold' }}>VISITORS</Typography>
      </Grid>
      <Grid sm={3} xs={6}>
       <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{stats.vpv}</Typography>
       <Typography sx={{ fontWeight: 'bold' }}>VIEWS PER VISITOR</Typography>
      </Grid>
      <Grid sm={3} xs={6}>
       <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{stats.bounce}%</Typography>
       <Typography sx={{ fontWeight: 'bold' }}>BOUNCE RATE</Typography>
      </Grid>
     </Grid>
    </Box>
   )}
  </Paper>
 )
}