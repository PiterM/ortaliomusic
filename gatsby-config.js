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
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
          version: '3.0.15',
          publicApiKey: process.env.GATSBY_SNIPCART_API_KEY,
          defaultLang: 'en',
          currency: 'eur',
          openCartOnAdd: false,
          locales: {
            fr: {
              actions: {
                checkout: 'Valider le panier',
              },
            }
          },
          innerHTML: `
          <billing section="bottom">
              <!-- Customization goes here -->
          </billing>`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`
  ],
}
