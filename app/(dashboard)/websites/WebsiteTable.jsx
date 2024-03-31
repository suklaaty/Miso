'use client'

import UseApi from '@/app/components/UseApi'
import { Button, Paper, Skeleton } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

export default function WebsiteTable() {
 let [isLoading, setIsLoading] = useState(true)
 let [websites, setWebsites] = useState([])

 let columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'domain', headerName: 'Domain', flex: 1 },
  { field: 'actions', headerName: 'Actions', minWidth: 150, flex: 1, renderCell: (values) => { return <><Button component={Link} scroll={false} href={`/website/${values.id}/edit`}>Edit</Button><Button component={Link} scroll={false} href={`/website/${values.id}/view`}>View</Button></> } }
 ]

 useEffect(() => {
  (async function () {
   let request = await UseApi(`websites?option=all`)
   if (request.status === 200) {
    setWebsites(request.data)
    setIsLoading(false)
   } else if (request.status !== 401) {
    enqueueSnackbar('Something unexpected happened', { variant: 'error' })
   }
  })()
 }, [])

 function CustomToolbar() {
  return (
   <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
    <GridToolbarFilterButton />
    <GridToolbarQuickFilter />
   </GridToolbarContainer>
  )
 }

 return (
  <Paper elevation={1}>
   {isLoading ? <Skeleton variant='rectangular' animation='wave' height={250} /> : (
    <DataGrid columns={columns} rows={websites} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 25, 50]} disableColumnSelector disableRowSelectionOnClick slots={{ toolbar: CustomToolbar }} autoHeight={true} sx={{ border: 'unset' }} />
   )}
  </Paper>
 )
}