import { createRouter } from 'next-connect';
const router = createRouter();
async function someMiddleware(req, res, next) {
    console.log('Middleware ran 🚀');
    await next();
}
router.all(someMiddleware, (req, res) => {
    return res.json({
        response: true
    });
});
export default router.handler({
    onError(err, req, res) {
        res.status(500).json({
            error: err.message,
        });
    },
});
