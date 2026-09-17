import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
    '/',
    '/shop(.*)',
    '/accessories(.*)',
    '/about(.*)',
    '/gallery(.*)',
    '/view/(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/assets/(.*)',
    '/textures/(.*)',
    '/placeholder(.*)',
    '/api/models(.*)',
    '/api/get-config(.*)',
    '/api/hello(.*)',
    '/api/getGlbFiles(.*)',
])

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}