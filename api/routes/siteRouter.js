const express = require('express');
const router = express.Router()
const siteController = require('../controllers/siteController');


router.get('/', siteController.getSite)
router.get('/reg', siteController.getSite)
router.get('/enter', siteController.getSite)
router.get('/password-reset', siteController.getSite)
router.get('/change-password', siteController.getSite)
router.get('/notes', siteController.getSite)
router.get('/user', siteController.getSite)

module.exports = router