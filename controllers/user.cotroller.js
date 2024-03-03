import user from "../model/user";
import bcrypt from 'bcryptjs';
// function to find user exists or not //

export const getAllUser = async(req, res, next)=>{
    let users; 
    try{ 
        users= await user.find();
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"foreigner alert !!"});
    }
    return res.status(200).json({users});
}

// to post/record a new user in DB or can say to sign an user up 

export const signup = async(req, res, next)=>{

    //following will be datials = name , email and password
    const {name, email,password}=req.body;
    
    // to check if user already exists !
    let alreadyAuser;
    try{
        alreadyAuser=await user.findOne({email});  //findOne is a function which returns one record, in this we've passed email for validation
    }catch(err){
           return console.log(err);
    }
    if(alreadyAuser){
        return res.status(400).json({message: "yepp , authorized user !"});
    }

    const hashedPassword = bcrypt.hashSync(password);

    //if user not found , then only it will go to create a new user record
    const newUser= new user({
        name,
        email,
        password: hashedPassword,
    });

   
    try{
        await newUser.save();
    }catch(err){
           return console.log(err);
    }
    return res.status(201).json({newUser});
}

//to login
export const login = async(req, res, next)=>{
    const {email, password}= req.body;
    let existsAlready ;

    try{
        existsAlready = await user.findOne({email});      

    }catch(err){
         return console.log(err);
    }
     if(!existsAlready){
        return res.status(404).json({message:"please fill a registered email"});
     }
     // to compare hashed password;

     const isPasswordCorrect = bcrypt.compareSync(password, existsAlready.password);

     if(!isPasswordCorrect){
        return res.status(400).json({message:"Enter correct Password"});
     }
     return res.status(200).json({message:"logged in Successfully"});
}