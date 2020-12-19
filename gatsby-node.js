require('typescript-require');

let basePath;
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

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    ortl_MediaItem: {
      imageFile: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url: source.sourceUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      }
    },
  })
}
  
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const { trackUrlHelper } = require('./src/common/trackUrlHelper.ts');
  const TrackPage = require.resolve('./src/pages/track-page.tsx');
  const HomePage = require.resolve('./src/pages/home-page.tsx');
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
                  imageFile {
                    childImageSharp {
                      fixed(width: 300, height: 300) {
                        width
                        height
                        src
                        srcSet
                      }
                    }
                  }
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
        path: trackUrlHelper(id, slug),
        component: TrackPage,
        context: {
          track: track.node.ortalioMusicTrack,
          id: track.node.id,
          slug: track.node.slug
        }
      });
    });
  }

  createPage({
    path: basePath,
    component: HomePage,
    context: {
      tracks
    }
  });
};