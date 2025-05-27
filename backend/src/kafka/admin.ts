import { kafka } from "./client";


export const createVisitTopic=async()=>{
     const admin = kafka.admin();
  await admin.connect();
  console.log("Creating topic [page-visits]...");

  await admin.createTopics({
    topics: [
      {
        topic: "page-visits",
        numPartitions: 2,
      },
    ],
  });

  console.log("Topic created.");
  await admin.disconnect();
}