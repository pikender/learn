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

const getVideobyID = (id) => new Promise((resolve) => {
  const [video] = videos.filter((attrs) => {
    return attrs.id === id;
  })

  resolve(video);
});

exports.getVideobyID = getVideobyID;
