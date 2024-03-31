import { AuthWrapper } from '@/app/components/AuthWrapper'
import LoginForm from './LoginForm'

export const metadata = {
 title: 'Login',
}

export default async function LoginPage() {
 return (
  <AuthWrapper>
   <LoginForm />
  </AuthWrapper>
 )
}