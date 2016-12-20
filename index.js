'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const {
  getVideobyID,
  getVideos,
  createVideo
} = require('./src/data');

const nodeInterface = require('./src/node');

const PORT = process.env.PORT || 5000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead',
  fields: {
    id: {
      // Match the interface
      type: new GraphQLNonNull(GraphQLID),
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
  },
  interfaces: [nodeInterface]
});

exports.videoType = videoType;

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root Query Type',
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      // Using () => { return getVideos }
      // gives [] and also (_, _args)
      // Check later
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the video'
        }
      },
      resolve: (_, args) => {
        return getVideobyID(args.id);
      }
    }
  }
});

const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  description: 'Input fields for Video',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video'
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video'
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether the video is released to public or not ?'
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Create a Video',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType)
        }
      },
      resolve: (_, args) => {
        return createVideo(args.video);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
