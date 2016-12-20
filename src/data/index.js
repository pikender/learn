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

const getVideos = () => new Promise((resolve) => {
  resolve(videos);
});

const createVideo = (args) => {
  const video = {
    id: (new Buffer(args.title, 'utf8')).toString('base64'),
    title: args.title,
    duration: args.duration,
    released: args.released
  };

  videos.push(video);

  return video;
}

exports.getVideobyID = getVideobyID;
exports.getVideos = getVideos;
exports.createVideo = createVideo;
