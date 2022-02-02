const crypto = require('crypto')
const sectret_key = process.env.secretKey
export const iv = crypto.randomBytes(16)
const getC = () => crypto.createCipheriv('aes-256-ctr', sectret_key, iv)
const getD = () => crypto.createDecipheriv('aes-256-ctr', sectret_key, iv)
export const hash = (str) =>
  crypto.createHash('sha256').update(str).digest('hex').toString()
export const enc = (str) => {
  const ci = getC()
  return Buffer.concat([ci.update(str), ci.final()]).toString('hex')
}
export const dec = (str) => {
  const di = getD()
  return Buffer.concat([
    di.update(Buffer.from(str, 'hex')),
    di.final(),
  ]).toString()
}
