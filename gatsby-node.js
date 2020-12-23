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
  const Page = require.resolve('./src/pages/page.tsx');

  const axios = require('axios');
  let tracksApiData = {};
  const response = await axios.get('https://api.soundcloud.com/users/1022559/tracks?client_id=96e9e3d300fb5ba39151f988943625d4');
  if (response.data.length > 0) {
    for (const track of response.data) {
      const slug = track.permalink;
      tracksApiData[slug] = {
        id: track.id,
        waveformUrl: track.waveform_url
      }
    }
  }

  const tracksData = await graphql(`
    query {
      ortl {
        ortalioMusicSiteData {
          edges {
            node {
              data {
                defaultPrice
              }
            }
          }
        }
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
                digitalItemGuid
                price
                coverImage {
                  sourceUrl(size: LARGE) 
                  altText
                  imageFile {
                    childImageSharp {
                      fixed(width: 400, height: 400) {
                        width
                        height
                        src
                        srcSet
                      }
                    }
                  }
                }
                thumbnailImage: coverImage {
                  sourceUrl(size: THUMBNAIL) 
                  altText
                  imageFile {
                    childImageSharp {
                      fixed(width: 120, height: 120) {
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

  const tracks = tracksData.data?.ortl?.ortalioMusicTracks?.edges;
  const defaultPrice = tracksData.data?.ortl?.ortalioMusicSiteData?.edges[0]?.node?.data?.defaultPrice;

  let tracksWithPrices = [];
  if (tracks && tracks.length > 0) {
    tracksWithPrices = tracks.map((item) => {
      const { id, slug } = item.node;
      const track = item.node.ortalioMusicTrack;
      const { price, previewUrl } = track;
      const trackPrice = price !== null ? price : defaultPrice;
      const match = previewUrl.match(/\/([^/]+)\/?$/);
      const soundcloudSlug = match[1] ? match[1]: undefined;

      return {
        node: {
          ...item.node,
          ortalioMusicTrack: {
            ...track,
            price: trackPrice,
            url: trackUrlHelper(id, slug),
            waveformUrl: tracksApiData[soundcloudSlug] ? tracksApiData[soundcloudSlug].waveformUrl : undefined
          }
        }
      };
    });

    tracksWithPrices.forEach(track => {
      const { id, slug } = track.node;

      createPage({
        path: trackUrlHelper(id, slug),
        component: Page,
        context: {
          track,
          tracks: tracksWithPrices,
        }
      });
    });
  }

  createPage({
    path: basePath,
    component: Page,
    context: {
      tracks: tracksWithPrices
    }
  });
};