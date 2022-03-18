const DB = require("./../Models");



async function getUserByEmail(email, res)
{
    try
    {
        let user = await DB.Users.find({email:email.toLowerCase()});
        return user;
    }
    catch(e)
    {
        return [];
    }
}

async function fetchAllUsers(res)
{
    try
    {
        let users = await DB.Users.find({});
        return users;
    }
    catch(e)
    {
        return [];
    }
}

async function createUser(user, res){
    console.log("User::::", user);
    try
    {
        await DB.Users.create(user, (error,result)=>{

            if(error)
            {
                return [];
            }
            else
            {
                return result;
            }
        });
    }
    catch(e)
    {
        return [];
    }
}

async function login(req, res){

    console.log("LOGIN::: ",req)
    try
    {
        return await DB.Users.find({email:req.email});
    }
    catch(e)
    {
        return [];
    }
}

async function edit(req, res)
{
    try
    {
        let email = req?.body?.email;
        return DB.Users.findOneAndUpdate({email:email}, req.body);
    }
    catch(e)
    {
        return [];
    }
}

module.exports={
    getUserByEmail:getUserByEmail,
    createUser:createUser,
    fetchAllUsers:fetchAllUsers,
    login:login,
    edit:edit
}

