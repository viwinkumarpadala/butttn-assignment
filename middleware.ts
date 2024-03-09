// Import authMiddleware from Clerk's Next.js package
import { authMiddleware } from "@clerk/nextjs";

// Define the regular expression to match routes with the format /api/id
const ignoredRoutesRegex = /^\/(api|submit|submit2)\/[a-zA-Z0-9-]+$/;

// Define the route to be ignored
const ignoredRoutes = [
  ignoredRoutesRegex
];

// Configure the authMiddleware with the ignoredRoutes option
const middleware = authMiddleware({
  ignoredRoutes
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Export the middleware as default
export default middleware;
