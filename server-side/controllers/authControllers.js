const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = db.User;
const transporter = require("../helpers/transporter");
const { Op } = require("sequelize");
const fs = require("fs");
const handlebars = require("handlebars");
module.exports = {
    register: async (req, res) => {
        try {
            const { username, email, password, password_confirmation } =
                req.body;

            console.log(req.body);

            if (!username || !email || !password)
                throw "please complete your data";

            if (password !== password_confirmation)
                throw "Password does not match";

            const passwordRegex =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
            if (!passwordRegex.test(password))
                throw "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number";

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            const generateVerticationToken = (username) => {
                let token = jwt.sign({ username }, "cuapcekrek", {
                    expiresIn: "9999 years",
                });
                return token;
            };

            const result = await user.create({
                username,
                email,
                password: hashPass,
            });

            let payload = { id: result.id };
            let token = jwt.sign(payload, "cuapcekrek", {
                expiresIn: "9999 years",
            });

            await user.update(
                { verification_token: token },
                {
                    where: {
                        id: result.id,
                    },
                }
            );

            const verificationLink = `http://localhost:3000/verification/${token}`;

            const tempEmail = fs.readFileSync("./template/confirmation.html", "utf-8");
            const tempCompile = handlebars.compile(tempEmail);
            const tempResult = tempCompile({ username, verificationLink });
      
            await transporter.sendMail(
              {
                from: `CuapCekrek <cuapcekrek@gmial.com}>`,
                to: email,
                subject: "Verify Your Account",
                html: tempResult,
              },
              (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              }
            );

            res.status(200).send({
                status: true,
                data: result,
                message: "register success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    login: async (req, res) => {
        try {
            const { emailOrUsername, password } = req.body;

            if (!emailOrUsername || !password)
                throw "please complete your data";

            const userExist = await user.findOne({
                where: {
                    [Op.or]: [
                        { email: emailOrUsername },
                        { username: emailOrUsername },
                    ],
                },
            });

            if (!userExist)
                throw {
                    status: false,
                    message: "User not found",
                };

            const isvalid = await bcrypt.compare(password, userExist.password);

            if (!isvalid)
                throw {
                    status: false,
                    message: "Wrong password",
                };

            const payload = {
                id: userExist.id,
                is_verified: userExist.is_verified,
            };

            const token = jwt.sign(payload, "cuapcekrek", { expiresIn: "1h" });

            //mengambil id dari bearer token
            const verifiedUser = jwt.verify(token, "cuapcekrek");
            console.log(verifiedUser);

            //pengecekan verifikasi
            if (!verifiedUser.is_verified) {
                throw "please verify your account";
            } else {
                res.status(200).send({
                    status: true,
                    message: "login success",
                    data: userExist,
                    token,
                });
            }
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    verification: async (req, res) => {
        try {
          // const id = req.user.id;
          const userExist = await user.findOne({
            where: {
              id: req.userId,
            },
          });
    
          await user.update(
            { is_verified: true },
            {
              where: {
                id: req.userId,
              },
            }
          );
          res.status(200).send({
            status: true,
            message: "Your account is verified",
          });
        } catch (error) {
          res.status(500).send(error);
        }
      },
};
