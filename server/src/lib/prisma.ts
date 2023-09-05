import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    log:['query']
    //da um log com o resultado da busca por rota no terminal
})