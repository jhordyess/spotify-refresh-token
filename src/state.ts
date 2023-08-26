let tempAuthCode: string | undefined

const getRandomString = (length: number = 16): string => {
  let randomStr = ''
  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    randomStr += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
  }
  return randomStr
}

export const getTempAuthCode = () => {
  const authCode = tempAuthCode
  tempAuthCode = undefined
  return authCode
}

export const setTempAuthCode = (length: number = 16): string => {
  tempAuthCode = getRandomString(length)
  return tempAuthCode
}
