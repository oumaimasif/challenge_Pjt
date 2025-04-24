//-----------Middeleware pour la protection des routes----------------
const jwt = require('jsonwebtoken');

//proteger certaines routes( user a un token valide o pas )
const verifierToken = (req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ','');   // en recuprere le token depuis le header et en leve le bearer pr garder just token  

if(!token)
{
    return res.status(401).json({msg:"Accès non autorisé veuiller vs connecter "})
}
try {
    const decoded =jwt.verify(token,process.env.JWT_SECRET)
    req.user= decoded;//passe id et role 
    console.log("decoded: ",decoded)
    next();//passer a etape suivent de middleware
} catch (error) {
    res.status(400).json({msg:'Token invalide '})
}
}

//verifier le role 
const checkRole = (roles)=>(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.status(401).json({msg:"Accès refusé : role nn autorisé "})//403 accès interdit 
    }
    next(); //si tt est ok en continuer verx la route 
}

module.exports= {verifierToken,checkRole}