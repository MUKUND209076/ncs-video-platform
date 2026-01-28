const prisma = require('../../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt')

exports.signup = async ({ name, email, password }) => {
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) throw new Error('User already exists')

  const hash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, passwordHash: hash }
  })

  // 🔐 Auto-login token
  const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  })

  return { user, token }
}


exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid credentials')

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) throw new Error('Invalid credentials')

  const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  })

  return { user, token }
}
