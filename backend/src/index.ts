import { createVisitTopic } from './kafka/admin';
import { initSocketServer } from './server';

const PORT = 3001;

(async () => {
  try {
    await createVisitTopic();
    const server = await initSocketServer();
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error starting app:', err);
  }
})();
