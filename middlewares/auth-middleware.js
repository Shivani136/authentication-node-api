import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

var checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {

            //get token from header
            token = authorization.split(' ')[1]
            // console.log(token, "token");
            // console.log(authorization, "authorization")

            //verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(userID,"useriddddddddddddd")
            //get user from token
            req.user = await UserModel.findById(userID).select('-password')
            // console.log(req.user)
            next()
            // res.send({ "status": "success", "message": " password changed successfully" })

        } catch (err) {
            console.log(err)
            res.status(401).send({ "status": "failed", "message": "unauthorized user" })
        }
    }
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "unauthorized user , No Token" })
    }
}
export default checkUserAuth;