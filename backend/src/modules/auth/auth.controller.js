const service = require('./auth.service')

exports.signup = async (req,res)=>{
  try{
    const data = await service.signup(req.body)
    res.json({ success:true, ...data })
  }catch(e){
    res.status(400).json({ error: e.message })
  }
}

exports.login = async (req,res)=>{
  try{
    const data = await service.login(req.body)
    res.json(data)
  }catch(e){
    res.status(400).json({ error: e.message })
  }
}

exports.me = async (req,res)=>{
  res.json(req.user)
}
