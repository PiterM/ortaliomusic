require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`,
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // {
    //   resolve: `gatsby-source-wordpress-experimental`,
    //   options: {
    //     url: `https://address`
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`
  ],
}
