import { kafka } from './client';

import { Server } from 'socket.io';
import http from 'http';
import { error } from 'console';

const server = http.createServer();
const io = new Server(server, { cors: { origin: '*' } });


const setupConsumerAbout=async(io:Server)=>{
    const AboutConsumer=kafka.consumer({groupId:"pages-group"});
    await AboutConsumer.connect();
    await AboutConsumer.subscribe({topic:"page-visits",fromBeginning:true})
    await AboutConsumer.run({
        eachMessage:async({partition,message})=>{
            
                const visit=message.value?.toString();
                if(visit) {
                    const visitData=JSON.parse(visit)
                    io.emit('about-page-visit', visitData);
                    console.log(`ABOUT Consumer - Partition ${partition}, User: ${visitData.userId}, Page: ${visitData.page}`);
                
            }
           
        }
    })
  io.listen(4002);
  console.log(' ABOUT Consumer socket running on port 4002');
}
setupConsumerAbout(io).catch(()=>console.log(error))