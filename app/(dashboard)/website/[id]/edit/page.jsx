import { AuthWrapper } from '@/app/components/AuthWrapper'
import EditWebsite from '@/app/(dashboard)/website/[id]/edit/EditWebsite'

export const metadata = {
 title: 'Edit Website'
}

export default async function EditWebsitePage({ params: { id } }) {
 return (
  <AuthWrapper>
   <EditWebsite websiteId={id} />
  </AuthWrapper>
 )
}