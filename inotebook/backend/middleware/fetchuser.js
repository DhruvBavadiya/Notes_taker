var jwt = require('jsonwebtoken');
const JWT_Key = "Dhruv@2003"
const fetchuser = (req,res,next)=>{
    // storing token into thunderbolt's headr.
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error:"please authenticate with valid token"})
    }

    try {
        // find data and verify jsw token.
        const data = jwt.verify(token,JWT_Key);
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"please authenticate with valid token"})
    }

    
} 

module.exports = fetchuser;