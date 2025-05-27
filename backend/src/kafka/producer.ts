//for now this is only for boilerplate for producing message
import { kafka } from './client';

export const sendPageVisit = async (userId: string, page: string) => {
  const producer = kafka.producer();
  await producer.connect();

  const message = {
    userId,
    page,
    timestamp: Date.now(),
  };

  await producer.send({
    topic: 'page-visits',
    messages: [
      {
        key: userId,
        value: JSON.stringify(message),
        partition: parseInt(userId) % 2 === 0 ? 0 : 1,
      },
    ],
  });

  console.log(`Sent visit from user ${userId} to ${page}`);
  await producer.disconnect();
};
