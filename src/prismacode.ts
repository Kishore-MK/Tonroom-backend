import express from "express";
import cors from "cors";
import prisma from "./lib/prisma";


const app= express()
const port= process.env.PORT||8080;

app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())


app.get("/request-queue", async (req, res) => {
  try {
    const requestQueue = await prisma.requestQueue.findMany();
    res.json(requestQueue);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


app.post("/request-queue", async (req, res) => {
  const { topic,  CreatorRole,
    ParticipantRole
   } = req.body;

  try {
    if(topic!=null&&CreatorRole!=null&&ParticipantRole!=null){
      const newRequest = await prisma.requestQueue.create({
      data: { topic,  CreatorRole,ParticipantRole },
    });
    console.log(newRequest);
    
    res.status(201).json(newRequest);
    }
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/chat-rooms", async (req, res) => {
  try {
    const chatRooms = await prisma.chatRooms.findMany();
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

app.post("/chat-rooms", async (req, res) => {
  const { topic, creator, participant, PaymentStatus,CreatorRole,ParticipantRole } = req.body;

  try {
    const newChatRoom = await prisma.chatRooms.create({
      data: { topic, creator, participant, PaymentStatus ,CreatorRole, ParticipantRole},
    });
    res.status(201).json(newChatRoom);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/deleterequest", async (req, res) => {
  try {
    
    // const topic=req.body.topic;
    const queue=await prisma.requestQueue.findMany();
    const r= queue.filter((q)=>q.topic==="kishore")
    console.log(r);
    
    // const id=r[0].id
    // const requestQueue = await prisma.requestQueue.delete({where:{id}})
    // res.json(id);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});




app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
    
})


// app.get("/request-queue", async (req, res) => {
//   try {
//     const requestQueue = await getRequestQueues();
//     res.json(requestQueue);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });

// app.post("/request-queue", async (req, res) => {
//   const { topic,  CreatorRole,
//     ParticipantRole
//    } = req.body;
//    console.log("clicked..");
   
//   try {
   
//       const newRequest = await createRequestQueue({
//       topic,  CreatorRole,ParticipantRole});
    
   
//     console.log(newRequest);
    
//     res.status(201).json(newRequest);
    
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// app.get("/chat-rooms", async (req, res) => {
//   try {
//     const chatRooms = await prisma.chatRooms.findMany();
//     res.json(chatRooms);
//   } catch (error) {
//     res.status(500).json({ error: error});
//   }
// });

// app.post("/chat-rooms", async (req, res) => {
//   const { topic, creator, participant, PaymentStatus,CreatorRole,ParticipantRole } = req.body;

//   try {
//     const newChatRoom = await prisma.chatRooms.create({
//       data: { topic, creator, participant, PaymentStatus ,CreatorRole, ParticipantRole},
//     });
//     res.status(201).json(newChatRoom);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// app.delete("/deleterequest", async (req, res) => {
//   try {
    
//     // const topic=req.body.topic;
//     const queue=await prisma.requestQueue.findMany();
//     const r= queue.filter((q)=>q.topic==="kishore")
//     console.log(r);
    
//     // const id=r[0].id
//     // const requestQueue = await prisma.requestQueue.delete({where:{id}})
//     // res.json(id);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });




