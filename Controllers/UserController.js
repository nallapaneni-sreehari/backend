const { UserModel } = require("../Models/User");
const {UserService} = require("../Services");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function getUserByEmail(email, res){
    if(!email)
    {
        res.status(400).send("Please provide email");
    }
    try
    {
        let user = await UserService.getUserByEmail(email, res);
        res.status(200).send({statusCode:200, message:user.length > 0 ? "User found": "User not found", data:user});

    }
    catch(e)
    {
        console.log("Error At UserController:::", e);
        res.status(500).send("Internal Error Occured");
    }
}

async function getAllUsers(res)
{
    try
    {
        let users = await UserService.fetchAllUsers(res);
        res.status(200).send({code:500, message:"Internal server error", data:users});

    }
    catch(e)
    {
        console.log("Error At UserController:::", e);
        res.status(500).send("Internal Error Occured");
    }
}


async function AddUser(user, res)
{

    if(!user)
    {
        console.log("User object not provided");
        res.status(400).send("User object not provided");
    }
    else
    {
        try
        {
            let result = await UserService.getUserByEmail(user.email, res);

            
            let isUserExist = false;
            
            isUserExist = result.length>0 ? true : false;


            if(!isUserExist)
            { 
                var accessToken = jwt.sign(user.email, config.SECRETE_KEY); 

                user.token = accessToken; user.isActive = 1; user.isDeleted = 0; user.lastLogin = Date.now();

                await UserService.createUser(user, res);
                return res.status(201).send({statusCode:201,message:"User created successfully"});
            }
            else
            {
                res.status(400).send({statusCode:400,message:"User already exist with this email"});
            }

        }
        catch(e)
        {
            console.log("Error At UserController:::", e);
            res.status(500).send("Internal Error Occured");
        }
    }
}

async function login(req, res){

    try
    {
        let result = await UserService.login(req, res);
        
        let passwordFromDb = result.length>0 ? result[0]?.password : ' ';
        let passwordInReq = req?.password ? req?.password : ' ';

        console.log("BBB:: ", result,req, passwordInReq, passwordFromDb)

        let validLogin = await bcrypt.compare(passwordInReq, passwordFromDb);

        if(validLogin)
        {
            console.log("Login success");
            
            res.status(200).send({statusCode:200, message:"Login success", data:[{email:req?.email, token:result[0]?.token}]});
        }
        else
        {
            console.log("Invalid credentials");

            res.status(401).send({statusCode:401, message:"Invalid credentials", data:[]});

        }

        console.log("LOGIN RES::: ", passwordFromDb, validLogin);

    }
    catch(e)
    {
        console.log(e)
        res.status(500).send({statusCode:500, message:"Internal Error Occured", data:[]});
    }
}

async function editUser(req, res)
{
    try
    {
        let editUser = await UserService.edit(req, res);
        res.status(200).send({statusCode:200, message: "User edited successfully", data:editUser});
        
    }
    catch(e)
    {
        res.status(500).send({statusCode:500, message: "Internal error",data:[]});

    }
}

module.exports ={
    getUserByEmail:getUserByEmail,
    AddUser:AddUser,
    getAllUsers:getAllUsers,
    login:login,
    editUser:editUser
}