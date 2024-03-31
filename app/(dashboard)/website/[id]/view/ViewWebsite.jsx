'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Container, Unstable_Grid2 as Grid, Menu, MenuItem, Typography } from '@mui/material'
import { formatDisplayDate } from '@/app/components/functions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import LineChart from '@/app/(dashboard)/website/[id]/view/LineChart'
import CountriesMap from '@/app/(dashboard)/website/[id]/view/CountriesMap'
import DetailsTable from '@/app/(dashboard)/website/[id]/view/DetailsTable'
import TopStats from '@/app/(dashboard)/website/[id]/view/TopStats'
import { Language } from '@mui/icons-material'
import UseApi from '@/app/components/UseApi'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

function WebsiteIcon({ website }) {
 let websiteIcon = <img src={`https://www.google.com/s2/favicons?domain=https://${website.domain}&sz=128`} alt={`${website.name} Icon`} width={30} height={30} />
 if (website.domain.includes('localhost')) {
  websiteIcon = <Language fontSize='large' />
 }
 return (
  <Container sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }} disableGutters>
   {websiteIcon}
   <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{website.name}</Typography>
  </Container>
 )
}

export default function ViewWebsite({ websiteId }) {
 let [website, setWebsite] = useState(null)
 let [rangeSelection, setRangeSelection] = useState(null)
 let [openDateMenu, setOpenDateMenu] = useState(false)
 let [anchorDateMenu, setAnchorDateMenu] = useState(null)
 let [displayDateRange, setDisplayDateRange] = useState([null, null])
 let [startDisplayDate, endDisplayDate] = displayDateRange
 let [dateRange, setDateRange] = useState([null, null])
 let [startDate, endDate] = dateRange
 let [openCustomMenu, setOpenCustomMenu] = useState(false)
 let [anchorCustomMenu, setAnchorCustomMenu] = useState(null)
 let [customRange, setCustomRange] = useState(dateRange)
 let [customStartDate, customEndDate] = customRange
 let [isLoading, setIsLoading] = useState(true)
 let router = useRouter()

 useEffect(() => {
  (async function () {
   let request
   if (location.pathname.includes('/p/')) {
    request = await UseApi(`website/public?id=${location.pathname.split('/p/')[1]}`)
    if (request.status === 401) {
     enqueueSnackbar(request.data.join('\n'), { variant: 'error' })
     router.push('/login')
    }
   } else {
    request = await UseApi(`website?id=${websiteId}&option=details`)
   }
   if (request.status === 200) {
    setWebsite(request.data)
    document.title = `${request.data.name} | Miso`
    setIsLoading(false)
   } else if (request.status === 404) {
    enqueueSnackbar('Website not found', { variant: 'error' })
    router.push('/websites')
   } else if (request.status !== 401) {
    enqueueSnackbar('Something unexpected happened', { variant: 'error' })
   }
  })()
 }, [websiteId, router])

 if (!rangeSelection) {
  let dateRange = localStorage.getItem('miso.date-range')
  if (dateRange !== null && dateRange !== '') {
   let [start, end] = JSON.parse(dateRange)
   updateRange('custom', new Date(start), new Date(end))
  } else {
   updateRange('last_7')
  }
 }

 function updateRange(range, customStart = null, customEnd = null) {
  if (range !== rangeSelection || range === 'custom') {
   let start = new Date()
   let end = new Date()
   switch (range) {
    case 'yesterday':
     start.setDate(start.getDate() - 1)
     end.setDate(end.getDate() - 1)
     break
    case 'this_week':
     start.setDate(start.getDate() - start.getDay())
     end.setDate(end.getDate() + (6 - end.getDay()))
     break
    case 'last_7':
     start.setDate(start.getDate() - 6)
     break
    case 'this_month':
     start.setDate(1)
     end.setMonth(end.getMonth() + 1);
     end.setDate(0)
     break
    case 'last_30':
     start.setDate(start.getDate() - 29)
     break
    case 'custom':
     start = customStart
     end = customEnd
     break
    default:
   }
   start.setHours(0)
   start.setMinutes(0)
   start.setSeconds(0)
   end.setHours(23)
   end.setMinutes(59)
   end.setSeconds(59)

   setDisplayDateRange([formatDisplayDate(start), formatDisplayDate(end)])
   setDateRange([start.toISOString(), end.toISOString()])
   setCustomRange([start, end])
   localStorage.setItem('miso.date-range', JSON.stringify([start, end]))
  }
  setRangeSelection(range)
  setOpenDateMenu(false)
  setAnchorDateMenu(null)
  setOpenCustomMenu(false)
  setAnchorCustomMenu(null)
 }

 function toggleDateMenu(e) {
  setOpenDateMenu(!openDateMenu)
  setAnchorDateMenu(openDateMenu ? null : e.currentTarget)
 }

 function toggleCustomMenu(e) {
  setOpenCustomMenu(!openCustomMenu)
  setAnchorCustomMenu(openCustomMenu ? null : e.currentTarget)
 }

 return (
  <>
   {isLoading ? '' : (
    <>
     <WebsiteIcon website={website} />
     <Grid container spacing={2}>
      <Grid xs={12}>
       <Button variant='contained' onClick={toggleDateMenu}>{startDisplayDate} - {endDisplayDate}</Button>
       <Menu open={openDateMenu} onClose={toggleDateMenu} anchorEl={anchorDateMenu}>
        <MenuItem onClick={() => updateRange('today')}>Today</MenuItem>
        <MenuItem onClick={() => updateRange('yesterday')}>Yesterday</MenuItem>
        <MenuItem onClick={() => updateRange('this_week')}>This Week</MenuItem>
        <MenuItem onClick={() => updateRange('last_7')}>Last 7 Days</MenuItem>
        <MenuItem onClick={() => updateRange('this_month')}>This Month</MenuItem>
        <MenuItem onClick={() => updateRange('last_30')}>Last 30 Days</MenuItem>
        <MenuItem onClick={toggleCustomMenu}>Custom Range</MenuItem>
        <Menu open={openCustomMenu} onClose={toggleCustomMenu} anchorEl={anchorCustomMenu}>
         <DatePicker selected={customStartDate} selectsRange={true} startDate={customStartDate} endDate={customEndDate} onChange={setCustomRange} isClearable={true} inline />
         <Box><Button variant='contained' onClick={() => { updateRange('custom', customStartDate, customEndDate === null ? customStartDate : customEndDate) }}>Apply</Button></Box>
        </Menu>
       </Menu>
      </Grid>
      <Grid xs={12}>
       <TopStats websiteId={website.id} startDate={startDate} endDate={endDate} />
      </Grid>
      <Grid xs={12}>
       <LineChart websiteId={website.id} startDate={startDate} endDate={endDate} />
      </Grid>
      <Grid container spacing={2} xs={12}>
       <Grid md={6} xs={12}>
        <DetailsTable websiteId={website.id} option='path' startDate={startDate} endDate={endDate} title='Page' />
       </Grid>
       <Grid md={6} xs={12}>
        <DetailsTable websiteId={website.id} option='referrer' startDate={startDate} endDate={endDate} title='Referrer' />
       </Grid>
       <Grid md={4} sm={6} xs={12}>
        <DetailsTable websiteId={website.id} option='browser' startDate={startDate} endDate={endDate} title='Browser' />
       </Grid>
       <Grid md={4} sm={6} xs={12}>
        <DetailsTable websiteId={website.id} option='os' startDate={startDate} endDate={endDate} title='OS' />
       </Grid>
       <Grid md={4} sm={6} xs={12}>
        <DetailsTable websiteId={website.id} option='device' startDate={startDate} endDate={endDate} title='Device' />
       </Grid>
       <Grid md={4} sm={6} xs={12}>
        <DetailsTable websiteId={website.id} option='countryName' startDate={startDate} endDate={endDate} title='Country' />
       </Grid>
       <Grid md={8} xs={12}>
        <CountriesMap websiteId={website.id} startDate={startDate} endDate={endDate} />
       </Grid>
      </Grid>
     </Grid>
    </>
   )}
  </>
 )
}