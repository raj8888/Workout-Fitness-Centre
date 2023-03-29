
var jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticator = async (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

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
                                    var new_token = jwt.sign({ userID: decoded.userID, role:decoded.role }, process.env.secretKey, { expiresIn: 60 });
                                    let decode= jwt.verify(new_token, process.env.secretKey, async function(err, decoded) {
                                        if(err){
                                            res.send({err:"Please Login First"});
                                        }else{
                                            req.body.userID=decoded.userID;
                                            req.body.role=decoded.role;
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