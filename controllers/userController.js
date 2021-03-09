const User  = require('../models/user')
const user  = require('../models/user')
const {cleanCache}   = require('../middleware/clearCache')

const index =   (req,res,next) => {
    User.find().cache()
    .then(data => {
        res.json({
            data
        })
    })
    .catch(error => {
        res.json({
            message: 'gagal menampilkan seluruh data!'
        })
    })
}

const show  =   (req, res, next) => {
    let userId  =   req.params.userId
    User.findById(userId)
    .then(data => {
        res.json({
            data
        })
    })
    .catch(error => {
        res.json({
            message: 'gagal mencari data'
        })
    })
}

const findAccount  =   (req, res, next) => {
    User.findOne({accountNumber:req.params.acc})
    .then(data => {
        res.json({
            message: 'data ditemukan',
            data
        })
    })
    .catch(error => {
        res.json({
            message: 'gagal mencari data'
        })
    })
}

const findIdentity  =   (req, res, next) => {
    User.findOne({identityNumber:req.params.iden})
    .then(data => {
        res.json({
            message: 'data ditemukan',
            data
        })
    })
    .catch(error => {
        res.json({
            message: 'gagal mencari data'
        })
    })
}


const createUser = async (req, res, next) => {
    let user = new User({
        userName        : req.body.userName,
        accountNumber   : req.body.accountNumber,
        emailAddress    : req.body.emailAddress,
        identityNumber  : req.body.identityNumber

    })

     const emailUser    = await User.findOne({emailAddress : user.emailAddress})
     const nameUser     = await User.findOne({userName : user.userName})
     const accountUser  = await User.findOne({accountNumber : user.accountNumber})
     const identityUser = await User.findOne({identityNumber : user.identityNumber})

        if (nameUser) {
            return res.status(404).json({
                status: false,
                message: 'userName sudah terdaftar'
            })
         }

        if (accountUser) {
            return res.status(404).json({
              status: false,
              message: 'accountNumber sudah terdaftar'
            })
          }

        if (emailUser) {
            return res.status(404).json({
              status: false,
              message: 'emailAddress sudah terdaftar'
            })
          }

          if (identityUser) {
            return res.status(404).json({
              status: false,
              message: 'identityNumber sudah terdaftar'
            })
          }


    user.save()
    .then(data => {
        res.json({
            message: 'berhasil menambahkan data!',
            data
        })
    cleanCache()
    })
    .catch(error => {
        res.json({
            message: 'error gagal menambahkan data'
        })
    })

}

const updateUser    =    (req,res,next) => {
    let userId = req.body.userId

    let updatedData = {
        userName        : req.body.userName,
        accountNumber   : req.body.accountNumber,
        emailAddress    : req.body.emailAddress,
        identityNumber    : req.body.identityNumber

    }

    User.findByIdAndUpdate(userId, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Berhasil diubah'
        })
    })
    .catch(error => {
        res.json({
            message: 'gagal diubah'
        })
    })
}

const deleteUser = ( req,res,next) => {
    let userId = req.params.userId
    User.findByIdAndRemove(userId)
    .then(()=>{
        res.json ({
            message: 'User deleted succesfully'
        })
    })
    .catch(error=> {
        res.json({
            message:'An error Occured'
        })
    })
}

module.exports = {
    index,
    show,
    createUser,
    updateUser,
    deleteUser,
    findAccount,
    findIdentity
}