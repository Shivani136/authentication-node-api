import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body
        const user = await UserModel.findOne({ email: email }); //check duplicate email
        if (user) {
            res.send({ "status": "failed", "message": "Email already Exist" })
        }
        else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {

                    try {

                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            password_confirmation: password_confirmation,
                            tc: tc
                        })

                        await doc.save() //all data save ib db 
                        const saved_user = await UserModel.findOne({ email: email })
                        //GENRATE JWT TOKEN 
                        const token = jwt.sign({ userID: saved_user._id },
                            process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

                        res.status(201).send({ "status": "True", "message": "Sucessfully Registration", "token": token })
                    } catch (err) {
                        console.log(err)
                        res.send({ "status": "failed", "message": "Unable to Register" })
                    }

                } else {
                    res.send({ "status": "failed", "message": "Password and Confirm Password Does not match" })
                }
            }
            else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }
        }

    }


    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body

            if (email && password) {
                const user = await UserModel.findOne({ email: email }); //check duplicate email
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {

                        //GENRATE JWT TOKEN 
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

                        res.send({ "status": "True", "message": "Login Sucessfully ", "token": token })
                    } else {
                        res.send({ "status": "failed", "message": "Email or Password is not VALID" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "you are not Registered user" })
                }
            }

            else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }

        } catch (err) {
            console.log(err)
            res.send({ "status": "failed", "message": "Unable to Login" })
        }

    }


    static changeUserPassword = async (req, res) => {
        const { password, password_confirmation } = req.body
        if (password && password_confirmation) {
            if (password !== password_confirmation){
                res.send({ "status": "failed", "message": "Password and Confirm Password Does not match" })
            }
             else{
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
             }   
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }


    }


}
export default UserController;