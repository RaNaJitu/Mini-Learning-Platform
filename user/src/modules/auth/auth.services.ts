import { Role } from "@prisma/client";
import prisma from "../../utils/prisma";
import argon2 from "argon2";
import { hashPassword } from "../../utils/hash";


export async function findUserByEmail(email: string) {
  const user: any = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return user;
}

export const RegisterUser = async (body: any) => {
  let {
    email,
    password,
    role
  } = body;
  
  
  const  { hash }  = await hashPassword(password);
  const created_user = await prisma.user.create({
    data: { email, role: (role as Role) || "STUDENT", password: hash },
  });

  return {
    id: created_user.id,
    email: created_user.email,
    role: created_user.role
  };
};

