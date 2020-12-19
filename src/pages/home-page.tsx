import * as React from 'react'
import Header from '../components/header';
import Tracks from '../containers/tracks/tracks';
import IndexLayout from '../layouts';
import Helmet from 'react-helmet'
// import Layout from "./components/layout";
// import SEO from "./components/seo";
// import Header from "../../components/header";

import './index.css';
import './custom.css';

export interface HomePageOwnProps {
  pageContext: any;
}

const IndexPage: React.FC<HomePageOwnProps> = ({ pageContext: { tracks }}: any) => {
  return (
    <>
      <Helmet
        title="Gatsby Default Starter"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <IndexLayout>
        <Header />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          <Tracks tracks={tracks} />
        </div>
      </IndexLayout>
    </>
  );
};

export default IndexPage;
