import argon2 from "argon2";
export async function hashPassword(password:string){
const hash = await argon2.hash(password);
console.log("==LOG== ~ hashPassword ~ hash:", hash)
return {hash}
}

export async function verifyPassword(candidatePassword:string, hash:any){
const isValid  =  await argon2.verify(hash, candidatePassword)
return isValid
}