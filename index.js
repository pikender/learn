'use strict';

const { graphql, buildSchema } = require('graphql');

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
  videos: () => [videoA, videoB]
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

const query = `
  query myFirstQuery {
    videos {
      id
      title
      duration
      watched
    }
  }
`;

graphql(schema, query, resolvers)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));


