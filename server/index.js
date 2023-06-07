import express from "express";
import * as dotenv from 'dotenv'
dotenv.config();
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from  'express-oauth2-jwt-bearer'

const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: 'RS256'
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.post("/verify-user", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];
    //console.log('Name:', name);

    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    if (user) {
      console.log('Existing user found:', user);
      res.json(user);
    } else {
      const newUser = await prisma.user.create({
        data: {
          email,
          auth0Id,
          name,
          phoneNumber:"",
        },
      });

      console.log('New user created:', newUser);
      res.json(newUser);
    }
  } catch (error) {
    console.error('Error in /verify-user endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/api/pizzas/getAllPizzas", async (req, res) => {
    const pizzas = await prisma.pizza.findMany({
      where: {
      },
    });
    res.json(pizzas);
  });


  app.post("/changePhoneNumber", requireAuth,async(req,res)=>{
    const auth0Id = req.auth.payload.sub;
    const {phoneNumber} = req.body;
    console.log(phoneNumber)
    try{
          const updatedPhoneNumber = await prisma.user.update({
            where:{
              auth0Id,
            },
            data:{
              phoneNumber:String(phoneNumber),
            }
          })
          res.status(200).send(updatedPhoneNumber);
        
    }catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error during registration" });
      }
    
})






app.post("/placeorder", requireAuth,async(req,res)=>{
    const {currentUser,cartItems,totalPrice} = req.body;
    // console.log(req.body)
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];
    try{
        const order = await prisma.order.create({
            data:{
                userName: name,
                email: email,
                auth0Id: auth0Id,
                totalPrice,
                items: cartItems,
            },
        });
        res.json(order);
    }catch (error) {
        console.error("Error during placeorder:", error);
        res.status(500).json({ message: "Error during placeorder" });
      }
    
})

app.get("/getuserorder",requireAuth, async(req,res)=>{
    const auth0Id = req.auth.payload.sub;
    console.log(auth0Id)
    try{
        const orders = await prisma.order.findMany({
            where: {
              auth0Id,
            },
          });
          res.json(orders);
    }catch (error) {
        console.error("Error geting orders:", error);
        res.status(500).json({ message: "Error geting orders" });
      }
    
    
});



app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});



