// Import authMiddleware from Clerk's Next.js package
import { authMiddleware } from "@clerk/nextjs";

// Define the regular expression to match routes with the format /api/id
const ignoredRoutesRegex = /^\/api\/[a-zA-Z0-9-]+$/;

// Define the route to be ignored
const ignoredRoutes = [
  ignoredRoutesRegex,
  /^\/submit\/[a-zA-Z0-9-]+$/,
];

// Configure the authMiddleware with the ignoredRoutes option
const middleware = authMiddleware({
  ignoredRoutes
});

// Export the middleware as default
export default middleware;
