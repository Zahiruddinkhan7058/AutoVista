import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "AutoVista - 3D Car Customization Platform",
  description: "Customize your dream car in 3D with AutoVista",
}

const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_bm9ybWFsLXdlcmV3b2xmLTM0LmNsZXJrLmFjY291bnRzLmRldiQ";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en" suppressHydrationWarning>
        <body className="font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  )
}