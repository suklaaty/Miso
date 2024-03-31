import { Container, Typography } from '@mui/material'
import NotFoundButton from './components/NotFoundButton'
import DefaultWrapper from './components/DefaultWrapper'

export const metadata = {
 title: 'Page Not Found',
}

export default async function NotFoundPage() {
 return (
  <DefaultWrapper>
   <Container maxWidth='xs' sx={{ textAlign: 'center', mt: 10 }} disableGutters>
    <Typography variant='h4' sx={{ mb: 2, pb: 1, fontWeight: 'bold' }}>Page Not Found</Typography>
    <Typography>You might be lost since this page does not seem to exist. Try not to get lost again.</Typography>
    <NotFoundButton href='/' title='Home' />
   </Container>
  </DefaultWrapper>
 )
}