'use strict';

const { Router } = require('express')
const router = Router ()
const User = require('../models/user')


router.use(require('./loginRoute'))

module.exports = router;
