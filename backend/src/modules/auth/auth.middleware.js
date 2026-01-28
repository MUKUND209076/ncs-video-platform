const jwt = require('jsonwebtoken')
const prisma = require('../../config/db')
const jwtConfig = require('../../config/jwt')

module.exports = async (req,res,next)=>{
  try{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(401).json({error:'No token'})

    const decoded = jwt.verify(token, jwtConfig.secret)
    const user = await prisma.user.findUnique({ where:{ id: decoded.id } })
    if(!user) return res.status(401).json({error:'Invalid token'})

    req.user = user
    next()
  }catch(e){
    res.status(401).json({error:'Unauthorized'})
  }
}
