const router = express.Router();

router.get('/', (req, res) => {
  res.send('Swagger UI should be served at /api-docs');
});

module.exports = router;