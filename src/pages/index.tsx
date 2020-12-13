import * as React from 'react'
import Header from '../components/header';
import Tracks from '../containers/tracks/tracks';
import IndexLayout from '../layouts/index';
import Helmet from 'react-helmet'
import SnipcartProvider from '../store/SnipcartProvider';
const { useEffect } = React;

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
  useEffect(() => {
    const { Snipcart }: any = window;
    if (!Snipcart) return;
    Snipcart.events.on('item.adding', (item: any) => {
      console.log('adding', item.id);
      // console.log('store', Snipcart.store.getState());
    });
    Snipcart.events.on('item.removed', (item: any) => {
      console.log('removed', item.id);
    });
    Snipcart.events.on('item.updated', (item: any) => {
      console.log('updated', item.id);
    });
  }, []);

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
