import DefaultWrapper from '@/app/components/DefaultWrapper'

export default async function RootLayout({ children }) {
  return (
    <DefaultWrapper>{children}</DefaultWrapper>
  )
}