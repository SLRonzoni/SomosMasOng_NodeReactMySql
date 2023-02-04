var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swagger = require('../documentation/swagger');
const usersRouter = require('./users.routes');
const organizationsRouter = require('./organizations.routes');
const testimonialsRouter = require('./testimonials.routes');
const newsRouter = require('./news.routes');
const categoriesRouter = require('./categories.routes');
const authRouter = require('./auth.routes');
const membersRouter = require('./members.routes');
const rolesRouter = require('./role.routes');
const activitiesRouter = require('./activities.routes');
const contactRoutes = require('./contacts.routes');
const commentRouter = require('./comments.routes');
const messagesRouter = require('./messages.routes');
const donationsRouter = require('./donations.routes');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/organization', organizationsRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/news', newsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);
router.use('/members', membersRouter);
router.use('/roles', rolesRouter);
router.use('/activities', activitiesRouter);
router.use('/contacts', contactRoutes);
router.use('/comments', commentRouter);
router.use('/messages', messagesRouter);
router.use('/donations', donationsRouter);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

module.exports = router;
