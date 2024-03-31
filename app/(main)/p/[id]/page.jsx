import { AuthWrapper } from '@/app/components/AuthWrapper'
import ViewWebsite from '@/app/(dashboard)/website/[id]/view/ViewWebsite'
import { Container } from '@mui/material'

export const metadata = {
 title: 'View Website'
}

export default function ViewPublicWebsitePage({ params: { id } }) {
 return (
  <AuthWrapper>
   <Container sx={{ mt: '50px' }}>
    <ViewWebsite websiteId={id} />
   </Container>
  </AuthWrapper>
 )
}