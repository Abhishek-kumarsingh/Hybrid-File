import logoDark from '@/assets/images/logo-dark.png'
import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper'
import { Figtree } from 'next/font/google'
import Image from 'next/image'
import NextTopLoader from 'nextjs-toploader'
import '@/styles/layout.css'
import '@/styles/custom-property-design.css'
import '@/styles/globals.css'
import { DEFAULT_PAGE_TITLE } from '@/context/constants'
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})
export const metadata = {
  title: {
    template: '%s | Lahomes Nextjs - Real Estate Management Admin Template',
    default: DEFAULT_PAGE_TITLE,
  },
  description: 'A fully responsive premium admin dashboard template, Real Estate Management Admin Template',
}
// Splash screen styles are now in /src/styles/layout.css
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={figtree.className} suppressHydrationWarning={true}>
        <div id="splash-screen">
          <Image
            alt="Logo"
            width={112}
            height={24}
            src={logoDark}
            style={{
              height: '6%',
              width: 'auto',
            }}
            priority
          />
        </div>
        <NextTopLoader color="#604ae3" showSpinner={false} />
        <div id="__next_splash">
          <AppProvidersWrapper>{children}</AppProvidersWrapper>
        </div>
      </body>
    </html>
  )
}
