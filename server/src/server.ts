import express from 'express';
import db from './config/connection.js';

import { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js'
import { authenticateToken } from './services/auth.js';

import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// import models and destructure into users/vehicles/service intead of separate imports
import models from './models/index.js';
const { User, Vehicle, Service } = models;

// import User from './models/User';
// import Vehicle from './models/Vehicle';
// import Service from './models/Service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any, {
    context: async ({ req }) => {
      const { user } = await authenticateToken({ req });
      return {
        user, // Authenticated user
        models: {
          User,
          Vehicle,
          Service,
        },
      };
    },
  }));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();