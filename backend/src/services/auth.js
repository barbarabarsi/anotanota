import bcrypt from "bcryptjs"

export const keyHash = async (key) => {
    bcrypt.hash(key, 8)
}