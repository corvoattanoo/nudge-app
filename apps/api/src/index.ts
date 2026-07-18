import 'dotenv/config'
import fastify from 'fastify';
import { authRoutes } from './routes/auth';
import { groupRoutes } from './routes/group'
import jwt from '@fastify/jwt'
import { eventsRoutes } from './routes/event';
import { votingRoutes } from './routes/vote';
import { planRoutes } from './routes/plan';

const server = fastify({ logger: true });

server.register(jwt, {
  secret: process.env.JWT_SECRET || 'supersecret'
})

server.register(groupRoutes, {prefix: '/api/groups'})

server.register(authRoutes, {prefix: '/api/auth'})

server.register(eventsRoutes, {prefix: '/api/events'})
server.register(votingRoutes, {prefix: '/api/votes'})
server.register(planRoutes, {prefix: '/api/plans'})

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
