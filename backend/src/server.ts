import express  from "express";
import http from 'http'
import { Server } from "socket.io";
import { Kafka } from "kafkajs";
import { kafka } from "./kafka/client";
import { setupConsumerHome } from "./kafka/consumer-home";


const app=express()
const server=http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

const producer=kafka.producer()


export const initSocketServer= async()=>{
    await producer.connect()
    await  setupConsumerHome(io)
    
        io.on('connection',(socket)=>{
            console.log("client connected to server",socket.id);
            
            socket.on("page-visit",async (data)=>{
                console.log("data send by user is ",data);

                const partition=data.page==='/home'? 0 : 1 

                await producer.send({
                    topic:'page-visits',
                    messages:[
                        {
                            key:data.userId,
                            value:JSON.stringify(data),
                            partition,
                        }
                    ]
                })
                console.log("message send to Kafka");
                
            })
            socket.on("disconnect",()=>{
                console.log("client disconnnect",socket.id);
                
            })
        })
     return server;
}