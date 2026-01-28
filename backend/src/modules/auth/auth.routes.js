const router = require('express').Router()
const c = require('./auth.controller')
const auth = require('./auth.middleware')

router.post('/signup', c.signup)
router.post('/login', c.login)
router.get('/me', auth, c.me)

module.exports = router
