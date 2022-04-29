import bcrypt from 'bcryptjs';

export const passwordHash = async (password, saltRounds)=>{
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Store hash in your password DB.
    return hashedPassword;
}
// Load hash from your password DB.

export const passwordPcrypt = async (password, hash)=>{
const result = bcrypt.compare(password, hash)
    // result == true
    return result;
}