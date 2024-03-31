'use client'

import UseApi from '@/app/components/UseApi'
import { Paper, Skeleton, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export default function LineChart({ websiteId, startDate, endDate }) {
 let [isLoading, setIsLoading] = useState(true)
 let [stats, setStats] = useState(null)
 let theme = useTheme()

 useEffect(() => {
  (async function () {
   setIsLoading(true)
   let request = await UseApi(`website?id=${websiteId}&option=page_view&start=${startDate}&end=${endDate}`)
   let res = []
   if (request.status === 200) {
    let timeDiff = (new Date(endDate) - new Date(startDate))
    if (timeDiff < 86400000) {
     res = request.data?.map((option, i) => ([option.date, option.views]))
    } else {
     res = Array.from(
      request.data.reduce((groups, entry) => {
       let date = new Date(entry.date)
       date.setHours(0)
       date = date.toISOString()
       groups.set(date, (groups.get(date) || []).concat(entry))
       return groups
      }, new Map())
     ).map(([date, entries]) => ([date, entries.reduce((sum, e) => sum + e.views, 0)]))
    }
    setStats(res)
    setIsLoading(false)
   }
  })()
 }, [websiteId, startDate, endDate])

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
     datetimeUTC: false
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
   {isLoading ? <Skeleton variant='rectangular' animation='wave' height={315} /> : <Chart options={chart.options} series={chart.series} type='area' height={300} />}
  </Paper>
 )
}