'use client'

import UseApi from '@/app/components/UseApi'
import { Button, Dialog, DialogContent, Skeleton } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { useState } from 'react'

export default function DetailsTablePopup({ websiteId, option, startDate, endDate, title }) {
 let [isOpen, setIsOpen] = useState(false)
 let [isLoading, setIsLoading] = useState(false)
 let [stats, setStats] = useState(null)

 async function openDialog() {
  setIsOpen(true)
  setIsLoading(true)
  let request = await UseApi(`website?id=${websiteId}&option=${option}&start=${startDate}&end=${endDate}`)
  if (request.status === 200) {
   setStats(request.data)
   setIsLoading(false)
  }
 }

 const columns = [
  { field: 'option', headerName: title, flex: 1 },
  { field: 'views', headerName: 'Views', flex: 1 }
 ]

 function CustomToolbar() {
  return (
   <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', px: 2, flexWrap: 'wrap-reverse' }}>
    <GridToolbarQuickFilter />
    <Button onClick={() => { setIsOpen(false) }} variant='contained'>Close</Button>
   </GridToolbarContainer>
  )
 }

 return (
  <>
   <Dialog open={isOpen} onClose={() => { setIsOpen(false) }} fullWidth={true} maxWidth='xl'>
    <DialogContent>
     {isLoading ? <Skeleton variant='rectangular' animation='wave' height={507.5} /> : (
      <DataGrid columns={columns} rows={stats} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 25, 50]} disableColumnSelector disableRowSelectionOnClick disableColumnFilter slots={{ toolbar: CustomToolbar }} autoHeight={true} />
     )}
    </DialogContent>
   </Dialog>
   <Button variant='outlined' onClick={openDialog}>More</Button>
  </>
 )
}