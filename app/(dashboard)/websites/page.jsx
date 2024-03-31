import WebsiteTable from './WebsiteTable'
import AddWebsiteForm from './AddWebsiteForm'
import { AuthWrapper } from '@/app/components/AuthWrapper'

export const metadata = {
 title: 'Websites',
}

export default function WebsitesPage() {
 return (
  <AuthWrapper>
   <AddWebsiteForm />
   <WebsiteTable />
  </AuthWrapper>
 )
}