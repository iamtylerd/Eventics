const { Router } = require('express')
const router = Router()
const login = require('../controllers/loginCtrl')

router.post('/api/reigster', login.create)
router.get('/api/login', login.get)




module.exports = router
