import 'dotenv/config'
import fastify from 'fastify';
import { authRoutes } from './routes/auth';

const server = fastify({ logger: true });

server.register(authRoutes, {prefix: '/api/auth'})

server.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3004;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`API Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
