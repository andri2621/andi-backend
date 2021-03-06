const express   =   require('express')
const router    =   express.Router()

const userController    =   require('../controllers/userController')
const authController    =   require('../controllers/authController')
const authenticate      =   require('../middleware/authenticate')


// tes tanpa auth
router.get('/index', userController.index)
// ============
router.get('/',authenticate , userController.index)
router.get('/find/:userId', authenticate ,userController.show)
router.get('/account/:acc' ,userController.findAccount)
router.get('/identity/:iden' , authenticate ,userController.findIdentity)
router.post('/create' , authenticate ,userController.createUser)
router.post('/update' , authenticate ,userController.updateUser)
router.delete('/delete/:userId' , authenticate ,userController.deleteUser)

router.post('/login', authController.login)



module.exports = router