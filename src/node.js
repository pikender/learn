'use strict';

const {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const { videoType } = require('../')

const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  // Expected Object Type
  resolveType: (object) => {
    if(object.title) {
      return videoType;
    }

    return null;
  }
});

module.exports = nodeInterface;
