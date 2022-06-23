import UserModel from "../models/User.js";
import transporter from '../config/emailConfig.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body
        const user = await UserModel.findOne({ email: email }); //check duplicate email
        if (user) {
            res.status(400).send({ "status": "failed", "message": "Email already Exist" })
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
                        res.status(400).send({ "status": "failed", "message": "Unable to Register" })
                    }

                } else {
                    res.status(400).send({ "status": "failed", "message": "Password and Confirm Password Does not match" })
                }
            }
            else {
                res.status(400).send({ "status": "failed", "message": "All Fields are Required" })
            }
        }

    }


    static userLogin = async (req, res) => {
        try {
          const { email, password } = req.body
          if (email && password) {
            const user = await UserModel.findOne({ email: email })
            if (user != null) {
              const isMatch = await bcrypt.compare(password, user.password)
              if ((user.email === email) && isMatch) {
                // Generate JWT Token
                const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                res.send({ "status": "success", "message": "Login Success", "token": token })
              } else {
                res.send({ "status": "failed", "message": "Email or Password is not Valid" })
              }
            } else {
              res.send({ "status": "failed", "message": "You are not a Registered User" })
            }
          } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
          }
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": "Unable to Login" })
        }
      }
   
  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }


  static loggedUser = async (req, res) => {
        res.send({ user: req.user });
    }

    static sendUserPasswordResetEmail = async (req, res) => {
        const { email } = req.body
        if (email) {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
                const link = `http://127.0.0.1.3000/api/user/reset/${user._id}/${token}`
                console.log(link)
                //send email code here

                let mailOptions = await transporter.sendMail({
                    from: 'Shivanichourasiya18@gmail.com',
                    to: user.email,
                    subject: 'Geekshop- Password Reset Link',
                    html:`<a href=${link}>Click Here To Reset Your Password</a>`,
                    attachments: [
                        { filename: 'profile.png', path: './images/profile.png' }
                     ]
    
            
                })
                
                transport.sendMail(mailOptions, function(err, info) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log(info);
                    }
                });

                
                res.send({
                    "status": "Success", "message": "Password Reset email sent , please check your mail", "id": user._id,
                    "token": token , "mailOptions" :mailOptions
                })
            } else {
                res.status(400).send({ "status": "failed", "message": "Email Does'nt Exist" })
            }
        } else {
            res.status(400).send({ "status": "failed", "message": "Email Field is Required" })
        }

        // res.send({ user: "dfddfg" });
    }

    static userPasswordReset = async (req, res) => {
        const { password, password_confirmation } = req.body
        const { id, token } = req.params
        console.log(req.params)
        const user = await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if (password && password_confirmation) {
                if (password !== password_confirmation) {
                    res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password, salt)
                    await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
                    res.send({ "status": "success", "message": "Password Reset Successfully" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Invalid Token" })
        }
    }

}
export default UserController;