
import { kafka } from './client';
import { Server } from 'socket.io';

export const setupConsumerHome = async (io: Server) => {

  const homeConsumer = kafka.consumer({ groupId: 'pages-group' });
  await homeConsumer.connect();
  await homeConsumer.subscribe({ topic: 'page-visits', fromBeginning: true });
  
  await homeConsumer.run({
    eachMessage: async ({ partition, message }) => {
    
        const visit = message.value?.toString();
        if (visit) {
          const visitData = JSON.parse(visit);
          io.emit('home-page-visit', visitData);
          console.log(` HOME Consumer - Partition ${partition}, User: ${visitData.userId}, Page: ${visitData.page}`);
        
      }
    },
  });
  console.log('Home Consumer: Processes partition 0 (/home pages)');
};