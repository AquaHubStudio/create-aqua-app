import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

// Create router
const router = createRouter<NextApiRequest, NextApiResponse>();

// Create a middleware function
async function someMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => any) {
  console.log('Middleware ran 🚀')
  await next()
}

// Actual route with proper method (GET | POST | PATCH | PUT | DELETE | ALL)
router.all(someMiddleware, (req, res) => {
  return res.json({
    response: true
  })
})

// Export router => optional Error handler functions
export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
})