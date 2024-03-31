'use client'

import { Paper, Skeleton, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import UseApi from '../components/UseApi'
import { enqueueSnackbar } from 'notistack'

export default function LineChart({ startDate, endDate }) {
 let [isLoading, setIsLoading] = useState(true)
 let [stats, setStats] = useState([])
 let theme = useTheme()

 useEffect(() => {
  (async function () {
   let request = await UseApi(`websites?option=page_view&start=${startDate}&end=${endDate}`)
   if (request.status === 200) {
    setStats(request.data)
    setIsLoading(false)
   } else if (request.status !== 401) {
    enqueueSnackbar('Something unexpected happened', { variant: 'error' })
   }
  })()
 }, [startDate, endDate])

 let chart = {
  series: [{
   name: 'Page Views',
   data: stats
  }],
  options: {
   chart: {
    background: '0',
    toolbar: {
     show: false
    }
   },
   colors: [theme.palette.primary.main],
   fill: {
    gradient: {
     shade: theme.palette.mode
    }
   },
   dataLabels: {
    enabled: false
   },
   xaxis: {
    type: 'datetime',
    labels: {
     datetimeUTC: false,
    }
   },
   yaxis: {
    labels: {
     formatter: function (val) {
      return val.toFixed(0)
     }
    }
   },
   theme: {
    mode: theme.palette.mode
   },
   tooltip: {
    x: {
     format: 'MMM dd, yyyy HH:ss'
    }
   },
   noData: {
    text: 'No Data'
   }
  }
 }

 return (
  <Paper elevation={1}>
   <Typography sx={{ fontWeight: 'bold', px: 2, py: 1 }}>Last 24 Hours</Typography>
   {isLoading ? <Skeleton variant='rectangular' animation='wave' height={315} /> : <Chart options={chart.options} series={chart.series} type='area' height={300} />}
  </Paper>
 )
}