exports.onPreBootstrap = themeOptions => {
  basePath = themeOptions.basePath || `/`;
};

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
    const config = getConfig()
    if (stage.startsWith('develop') && config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom': '@hot-loader/react-dom'
      }
    }
  }
  
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const TrackUrlHelper = require('./src/common/trackUrlHelper.js');
  const Track = require.resolve('./src/containers/tracks/components/track.tsx');
  const tracksData = await graphql(`
    query {
      ortl {
        ortalioMusicTracks {
          edges {
            node {
              id
              slug
              ortalioMusicTrack {
                body
                description
                previewUrl
                title
                coverImage {
                  sourceUrl(size: LARGE)
                  altText
                }
              }
            }
          }
        }
      }
    }
  `);

  if (tracksData.errors) {
    reporter.panic(tracksData.errors);
  }

  const tracks = tracksData.data.ortl.ortalioMusicTracks.edges;
  if (tracks && tracks.length > 0) {
    tracks.forEach(track => {
      const { id, slug } = track.node;
      createPage({
        path: TrackUrlHelper(id, slug),
        component: Track,
        context: {
          track: track.node.ortalioMusicTrack,
          id: track.node.id,
          slug: track.node.slug
        }
      });
    });
  }
};