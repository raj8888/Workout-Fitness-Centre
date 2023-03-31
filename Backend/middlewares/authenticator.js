
var jwt = require('jsonwebtoken');
require('dotenv').config()
const {client} = require("../config/redisDB")

const authenticator = async (req,res,next)=>{
   const loggedInUserEmail = req.headers.authorization?.split(" ")[1];
    let token  = await client.HGET("token",loggedInUserEmail)
    let refresh_token  = await client.HGET("refresh_token",loggedInUserEmail)

    if(token){
        let decode= jwt.verify(token, process.env.secretKey, async function(err, decoded) {
            if(err){
                if(err.message=="jwt expired"){
                    const refresh_token = req.headers.authorization_refresh?.split(" ")[1];

                    if(refresh_token){
                            let decode= jwt.verify(refresh_token, process.env.refreshSecretKey, async function(err, decoded) {
                                if(err){
                                    res.send({msg:"Please login again",err:err.message})
                                }else{
                                    var new_token = jwt.sign({ userID: decoded.userID, role:decoded.role, name:decoded.name }, process.env.secretKey, { expiresIn:"7d" });
                                    let decode= jwt.verify(new_token, process.env.secretKey, async function(err, decoded) {
                                        if(err){
                                            res.send({err:"Please Login First"});
                                        }else{
                                            req.body.userID=decoded.userID;
                                            req.body.role=decoded.role;
                                            req.body.username=decoded.name;
                                            next();
                                        }
                                    })
                                }
                            });
                    }else{ 
                            res.send({err:"Please Login First"});           
                    }
                }else{
                        res.send({err:"Please Login First"});    
                }
            }else{
                req.body.userID=decoded.userID;
                req.body.role=decoded.role;
                req.body.username=decoded.name;
                next();
            }
        });
    }else{ 
        res.send({err:"Please Login First"});        
    }
}

module.exports={
    authenticator
}