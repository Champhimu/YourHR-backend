const userModels = require("../model/userSchema");
const bcrypt = require("bcrypt");

exports.registerController = async (req,res) => {
    try {
        const {fullname, email, password } = req.body;

        // Validation
        if(!fullname || !email || !password) {
            return res.status(400).send({
                message: "Please Fill all details"
            })
        }

        // exisiting user
        const exisitingUser = await userModels.findOne({email})
        if(exisitingUser){
            return res.status(401).semd({
                message: "User email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // save new user
        const user = new userModels({fullname, email, password: hashedPassword})
        await user.save();
        return res.status(201).send({
            message: "User created successfully",
            user,
        });
    }catch (error){
        console.log(error);
        return res.status(500).send({
            message: "Error to register the user",
            error,
        });
    }
};

exports.loginController = async (req,res) => {
    try {
        const {email, password} = req.body;

        // validation
        if (!email || !password){
            return res.status(401).send({
                message: "Please provide email and password",
            });
        }

        // Check email
        const user = await userModels.findOne({email});
        if(!user){
            return res.status(200).semd({
                message: "Email is not register",
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).send({
                message: "Invalid password",
            });
        } 
        return res.status(200).send({
            message: "Login successfully",
            user,
        });
    } catch (error){
        console.log(error);
        return res.status(500).send({
            message: "Error in Login"
        });
    }
}
