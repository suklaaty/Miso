import { AuthWrapper } from '@/app/components/AuthWrapper'
import ViewWebsite from '@/app/(dashboard)/website/[id]/view/ViewWebsite'

// export const metadata = {
//  title: 'View Website'
// }

export default async function ViewWebsitePage({ params: { id } }) {
 return (
  <AuthWrapper>
   <ViewWebsite websiteId={id} />
  </AuthWrapper>
 )
}