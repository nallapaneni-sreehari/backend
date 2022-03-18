const express = require('express');
const cors = require('cors');
// const { MongoClient } = require('mongodb');
var bodyparser = require('body-parser');
const mongoose = require('mongoose');
const controller = require('./Controllers');
const connection = require('./connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./auth');
const path = require('path');
const { exec } = require("child_process");
const config = require('./config/keys.json');

const port = process.env.PORT || 5001;

const app = express();


console.log("Current Dir ::: ", __dirname);

exec("ls", (error, stdout, stderr) => {
    if (error) {
        console.log(`ls : error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`ls : stderr: ${stderr}`);
        return;
    }
    console.log(`ls : stdout: ${stdout}`);
});

// Middlewares
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Connect to MongoDB
const db = connection.connect();

app.get('/user/:email',authenticateToken, (req,res)=>{
    // console.log(`Get user by ${req.params.email},  ${req.data}`);

    let email = req.params.email;

    controller.UserController.getUserByEmail(email, res);

});


app.get('/users',(req,res)=>{
    controller.UserController.getAllUsers(res);
});

app.post('/users/add', async (req,res)=>{
    
    try
    {

        //Encrypt Password
        if(Object.keys(req.body).length>0 && req.body.password)
        {

            const hashedPassword = await bcrypt.hash(req.body.password, parseInt(config.SALT_ROUNDS));
            req.body.password = hashedPassword;
            
            controller.UserController.AddUser(req.body, res);

        }
        else
        {
            res.status(400).send({statusCode:400,message:"Missing one or more request parameters"});
        }
        

    }
    catch(e)
    {
        console.log(e)
        res.status(500).send("Error while hashing password");
    }
});

app.post('/users/login', async (req,res) => {
    let username = req?.body?.username;
    let password = req?.body?.password;

    if(username && password)
    {
        
        controller.UserController.login({email:username, password:password}, res);
    }
    else
    {
        res.status(401).send({statusCode:401, message:"Username and Password are required"});
    }
});

app.post('/users/edit',authenticateToken, async (req, res) => {

    if(req.data == req.body.email)
    {
        controller.UserController.editUser(req, res);
    }
    else
    {
        res.status(403).send({statusCode:403, message: "Invalid access token for this email"});
    }
});


app.listen(port, (success, error)=>{
    if(error)
        throw error;
    else
        console.log(`Server running on port number:: ${port}`)
});