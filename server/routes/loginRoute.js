const { Router } = require('express')
const router = Router()
const login = require('../controllers/loginCtrl')

router.post('/api/login', login.create)



module.exports = router
