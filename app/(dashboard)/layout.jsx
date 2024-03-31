import DashboardWrapper from '@/app/components/DashboardWrapper'

export default async function RootLayout({ children }) {
  return (
    <DashboardWrapper>{children}</DashboardWrapper>
  )
}