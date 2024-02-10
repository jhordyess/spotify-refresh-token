//TODO Improve using better ways to handle this

let tempAuthCode: string | undefined

export const checkAuthCode = (code: string) => {
  if (tempAuthCode === code) {
    tempAuthCode = undefined
    return true
  } else return false
}

export const getAuthCode = (length: number = 16): string => {
  let randomStr = ''
  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    randomStr += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
  }

  tempAuthCode = randomStr
  return randomStr
}
