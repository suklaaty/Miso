import { AuthWrapper } from '@/app/components/AuthWrapper'
import RegisterForm from './RegisterForm'
import { notFound } from 'next/navigation'

export const metadata = {
 title: 'Register',
}

export default async function RegisterPage() {
 if (process.env.AUTH_ALLOW_REGISTRATION != "1") {
  notFound()
 }

 return (
  <AuthWrapper>
   <RegisterForm />
  </AuthWrapper>
 )
}