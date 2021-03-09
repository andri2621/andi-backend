const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {

    // if(!token) return res.status(400).json({
    //     status : res.statusCode,
    //     message: 'Access Denied !'
    // })
    try {

        const token     = req.headers.authorization.split(' ')[1]
        const decode    = jwt.verify(token, 'secret') 

        req.user        = decode
        next()
        
    } 
    catch (error) {
        res.json({
            message: 'invalid token!'
        })
    }
    
}

module.exports = authenticate