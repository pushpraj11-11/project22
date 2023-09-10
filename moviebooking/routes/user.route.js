const express = require('express')
const app =express()
const router = express.Router()
const usercontrol = require('../controllers/user.controller')
const getcoupen = require('../controllers/user.controller')
const bookshow = require('../controllers/user.controller')
router.post('/auth/signup' ,usercontrol.signUp)

router.post('/auth/login' ,usercontrol.login)

router.post('/auth/logout' ,usercontrol.logout)

router.get('/getCouponCode', getcoupen.getCouponCode)

router.post('/bookShow' , bookshow.bookShow)
// app.listen(3000,()=>{
//     console.log('3000')
//   }) 
module.exports = router
