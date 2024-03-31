import { AuthWrapper } from '@/app/components/AuthWrapper'
import EditProfileForm from './EditProfileForm'

export const metadata = {
 title: 'Edit Profile',
}

export default function ProfilePage() {
 return (
  <AuthWrapper>
   <EditProfileForm />
  </AuthWrapper>
 )
}