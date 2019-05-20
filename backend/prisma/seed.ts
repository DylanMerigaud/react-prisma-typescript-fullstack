import { prisma, } from '../src/generated/prisma-client'

async function main() {
  await prisma.createUser({
    name: 'Admin',
    email: 'admin@adminadminadminadminadmin.admin',
    password: 'admin',
    role: 'ADMIN',
  })
}

main()
