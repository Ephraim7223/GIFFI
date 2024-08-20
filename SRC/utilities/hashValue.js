import cryptoHash from "crypto";

export function hashValue(value) {
    const hash = cryptoHash.createHash('sha256')
    hash.update(value)
    return hash.digest('hex')
}

export function comparePasswords(inputPassword, hashedPassword) {
    return hashValue(inputPassword) === hashedPassword
}

export function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1)
    const max = Math.pow(10, digits) - 1
    return Math.floor(Math.random() * (min - max + 1)) + min 
}
