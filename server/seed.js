import pizzas from './data/pizza-data.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


pizzas.map(pizza=>{
    async function main() {  
        const a = await prisma.pizza.create({
            data: pizza,
            
        });
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

})
