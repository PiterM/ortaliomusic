import * as React from 'react'
import Header from '../components/header';
import Tracks from '../containers/tracks/tracks';
import IndexLayout from '../layouts/index';
import Helmet from 'react-helmet'
import SnipcartProvider from '../store/SnipcartProvider';

import './index.css';
import './custom.css';

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <SnipcartProvider>
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
          <Tracks />
        </div>
      </IndexLayout>
    </SnipcartProvider>
  );
};

export default IndexPage;
