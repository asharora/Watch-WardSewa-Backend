const express = require('express')

const DutyCtrl = require('./controller')

const router = express.Router()

router.get('/get-slots', DutyCtrl.getSlot)
router.post('/book-slot', DutyCtrl.bookSlot)
router.post('/book-header', DutyCtrl.bookHeader)
router.post('/create-slot', DutyCtrl.createSlot)
router.post('/save-slot', DutyCtrl.saveSlot)

module.exports = router