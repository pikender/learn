'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const PORT = process.env.PORT || 5000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether the video is watched or not ?'
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root Query Type',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of the video'
        }
      },
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 90,
          watched: false
        })
      })
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

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
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
