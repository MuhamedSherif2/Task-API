const UserModel = require('../Model/User.Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.Register = async function (req, res) {
    try {
        let newUser = new UserModel(req.body)
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        newUser.password = hashedPassword
        let user = await newUser.save()
        res.json({
            message: 'SignUp Successfully', user: {
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        res.status(400).send({
            message: error
        })
    }
}

exports.Login = async function (req, res) {
    try {
        let user = await UserModel.findOne({ email:req.body.email })
        if (!user || !await user.comparePassword(req.body.password)) {
            res.status(400).send({ massage: 'invalid email or password' })
        } else {
            const token = jwt.sign({
                email: user.email ,
                _id: user._id , 
                role: user.role}, 
                'secretKey'
            )
            return res.json({
                message: 'user loged in success',
                user: {
                    email: user.email,
                    name: user.name,
                    jwt: token
                }
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error
        })
    }
}