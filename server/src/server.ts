import Fastify from "fastify"
import cors from '@fastify/cors'
import { prisma } from "./lib/prisma"
import { appRoutes } from "./routes"



//
const app = Fastify()

app.register(cors) //sinaliza quem pode acessar os dados do nosso backend
//Sem o cors, nenhuma aplicação frontend tem acesso ao meu backend
app.register(appRoutes)

/**
 * Métodos HTTP: Get(busca algum recurso), Post(cria alguma coisa do backend), Put(atualizar algum recurso do backend), Delete(deleta algum recurso do backend), Patch(atualiza algum recurso especifico do backend)
 */



app.listen({
    port:3333,
}).then(()=>{
    console.log("HTTP Server Running")
})