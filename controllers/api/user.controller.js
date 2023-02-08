const Op = require("sequelize").Op;
const sequelize = require("sequelize");
const UserModel = require("../../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jasonjwt = process.env.SECRET;


// exports.login = async(req, res)=>{
//     const email = req?.body?.email || null;
//     const password = req?.body?.password || null;
//   console.log(email);

//   if (email && email != null && email != '') {
//     try {
//       const user = await UserModel.findOne({
//         where: { email: email },
//       });

//       if (user) {
//         const userOtp = Math.floor(1000 + Math.random() * 9000);
//         await UserModel.update({
//           otp: userOtp,
//         }, { where: { id: user.id } });

//         const userDetails = await UserModel.findOne({
//           attributes: ['id', 'otp', 'email'],
//           where: { email: email },
//         });

//         return res.status(200).send({
//           data: { success: true, userDetails: userDetails },
//           errorNode: { errorCode: 0, errorMsg: "No error" },
//         });

//       } else {
//         return res.status(200).send({
//           data: { success: false, message: "User not found", userEmail: email },
//           errorNode: { errorCode: 1, errorMsg: "User not found" },
//         });
//       }
//     } catch (error) {
//       return res.status(500).send({
//         data: { success: false, message: "Something went wrong" },
//         errorNode: { errorCode: 1, errorMsg: error },
//       });
//     }
//   } else {
//     return res.status(400).send({
//       data: { success: false, message: "Email is required" },
//       errorNode: { errorCode: 1, errorMsg: "Email isand password are required" },
//     });
//   }
// }


exports.login = async (req, res) => {
    const email = req.body.data.email;
    const password = req.body.data.password;
    // console.log(email);
    // console.log(password);

    if (!email || !password) {
        return res.status(200).send({
            data: {
                success: true,
                message: "email & password is required",
            },
            errorNode: {
                errorCode: 0,
                errorMsg: "no error",
            },
        });
    }
    const count = await UserModel.count({ where: { email: email } });
    // console.log(count);
    if (count) {
        const dataLog = await UserModel.findOne({ where: { email: email } })
        // console.log(dataLog);
        if (bcrypt.compareSync(password, dataLog.password)) {
            const payload = {
                // id: dataLog.id,
                name: dataLog.name,
                email: dataLog.email,
                password: dataLog.password,
            }
            // console.log(payload + "gggggggggggggggggggggggggggggggggggggg");
            const token = jwt.sign(payload, jasonjwt);
            // console.log(token);
            // console.log("111111111111111111111111111111111");
            const dataName = {
                // id: dataLog.id,
                name: dataLog.name,
                email: dataLog.email,
                password: dataLog.password,
                description: dataLog.description,
                token: token,
            }
            // console.log(dataName + "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
            // console.log("222222222222222222222222222222222");
            return res.status(200).send({
                data: {
                    success: true,
                    details: dataName,
                    message: "User found"
                },
                errorNode: {
                    errorCode: 0,
                    errorMsg: "no error",
                },
            })
        } else {
            return res.status(400).send({
                data: {
                    success: false,
                    details: {},
                    message: "Invalid password"
                },
                errorNode: {
                    errorCode: 0,
                    errorMsg: "no error",
                },
            })
        }
    } else {
        return res.status(400).send({
            data: {
                success: false,
                details: {},
                message: "user not found"
            },
            errorNode: {
                errorCode: 0,
                errorMsg: "no error",
            },
        })
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email,mobile, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword || !mobile) {
            return res.status(400).send({
                data: {
                    success: false,
                    message: "All fields are required",
                },
                errorNode: {
                    errorCode: 0,
                    errorMsg: "All fields are required",
                },
            });

        }
        if (password == confirmPassword) {
            const user = await UserModel.count({ where: { email: email } });
            if (user) {
                const userOtp = Math.floor(1000 + Math.random() * 9000);
                await UserModel.update({
                  otp: userOtp,
                }, { where: { id: user.id } });
        
                const userDetails = await UserModel.findOne({
                  attributes: ['otp', 'email'],
                  where: { email: email },
                });
        
                return res.status(200).send({
                  data: { success: true, userDetails: userDetails },
                  errorNode: { errorCode: 0, errorMsg: "No error" },
                });
                return res.status(200).send({
                    data: { success: false, message: "User not found", userEmail: email },
                    errorNode: { errorCode: 1, errorMsg: "User not found" },
                  });
        
              } 
            //   else {
                // return res.status(200).send({
                //   data: { success: false, message: "User not found", userEmail: email },
                //   errorNode: { errorCode: 1, errorMsg: "User not found" },
                // });
            //   }
            // if (count > 0) {
            //     return res.status(400).send({
            //         data: {
            //             sucess: false,
            //             message: "Email allready exists",
            //         },
            //         errorNode: {
            //             errorCode: 0,
            //             errorMsg: "Email allready exists",
            //         },
            //     })
            // }
             else {
                const hashPassword = bcrypt.hashSync(password, 10)
                await UserModel.create({
                    name: name,
                    email: email,
                    mobile:mobile,
                    password: hashPassword,
                    confirmPassword: hashPassword
                })
                    .then(() => {
                        res.status(200).send({
                            data: {
                                success: true,
                                message: "Successfully signup",
                            },
                            errorNode: {
                                errorCode: 0,
                                errorMsg: "no error",
                            },
                        })
                    }).catch((error) => {
                        res.status(500).send({
                            data: {
                                success: false,
                                message: "Something went wrong",
                            }
                        })
                    })
            }
        } else {
            return res.status(400).send({
                data: {
                    sucess: false,
                    message: "password and confirm password are not matched",
                },
                errorNode: {
                    errorCode: 0,
                    errorMsg: "password and confirm password are not matched",
                },
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            data: {
                sucess: false,
                details: "Something went wrong!! please try again",
            },
            errorNode: { errorCode: 1, errorMsg: "error" },
        });
    }
}