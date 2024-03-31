import { Button, Paper, Skeleton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UseApi from '@/app/components/UseApi'
import { enqueueSnackbar } from 'notistack'

export default function DetailsTable({ startDate, endDate }) {
 let [isLoading, setIsLoading] = useState(true)
 let [stats, setStats] = useState([])

 useEffect(() => {
  (async function () {
   let request = await UseApi(`websites?option=total_views&start=${startDate}&end=${endDate}`)
   if (request.status === 200) {
    setStats(request.data)
    setIsLoading(false)
   } else if (request.status !== 401) {
    enqueueSnackbar('Something unexpected happened', { variant: 'error' })
   }
  })()
 }, [startDate, endDate])

 const columns = [
  { field: 'domain', headerName: 'Domain', flex: 1 },
  { field: 'views', headerName: 'Views', flex: 1 },
  { field: 'actions', headerName: 'Actions', minWidth: 150, flex: 1, renderCell: (values) => { return <><Button component={Link} scroll={false} href={`/website/${values.id}/edit`}>Edit</Button><Button component={Link} scroll={false} href={`/website/${values.id}/view`}>View</Button></> } }
 ]

 return (
  <Paper elevation={1}>
   {isLoading ? <Skeleton variant='rectangular' animation='wave' height={250} /> : (
    <DataGrid columns={columns} rows={stats} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 25, 50]} disableColumnSelector disableRowSelectionOnClick disableColumnFilter autoHeight={true} sx={{ border: 'unset' }} />
   )}
  </Paper>
 )
}