import { Roboto } from 'next/font/google'
const roboto = Roboto({
 weight: '400',
 subsets: ['latin'],
})

export const metadata = {
 title: {
  template: '%s | Miso',
  default: 'Miso'
 },
 description: 'Miso in meant to be a simple and fast alternative to other website analytics that purposely handicap the functionality and accuracy of the data.',
}

export const viewport = {
 width: 'device-width',
 initialScale: 1,
 userScalable: 0,
}

export default function RootLayout({ children }) {
 return (
  <html lang='en'>
   <body className={roboto.className}>{children}</body>
  </html>
 )
}
