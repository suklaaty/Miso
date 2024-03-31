import { AuthWrapper } from '@/app/components/AuthWrapper'
import HomeCharts from '@/app/(dashboard)/HomeCharts'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <HomeCharts />
    </AuthWrapper>
  )
}