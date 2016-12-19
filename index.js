'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const { buildSchema } = require('graphql');

const PORT = process.env.PORT || 5000;
const server = express();

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }

  type Query {
    video: Video,
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`);

const resolvers = {
  video: () => ({
    id: '1',
    title: 'Foo',
    duration: 180,
    watched: true
  }),
  videos: () => videos
};

const videoA = {
  id: '2',
  title: 'Create a GraphQL SchemaA',
  duration: 60,
  watched: false
}

const videoB = {
  id: '3',
  title: 'Create a Graph List Type',
  duration: 180,
  watched: true
}

const videos = [videoA, videoB];

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
