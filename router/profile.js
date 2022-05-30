const express = require('express');
const router = express.Router();
const profileController =require('../controler/profilecontroller')


router.get('/edit-firstname',profileController.geteditfirst)

router.get('/edit-lastname',profileController.geteditlast)

router.get('/edit-passward',profileController.geteditpass)

router.get('/edit-email',profileController.geteditemail)

router.get('/edit-username',profileController.getedituname)

router.get('/admin-page',profileController.getadmin)

router.post('/edit-firstname',profileController.editFname)

router.post('/edit-lastname',profileController.editLname)

router.post('/edit-passward',profileController.editpassword)

router.post('/edit-email',profileController.editemail)

router.post('/edit-username',profileController.editUname)

module.exports =router