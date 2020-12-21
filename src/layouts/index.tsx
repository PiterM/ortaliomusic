import * as React from "react";
import Helmet from 'react-helmet';

const Layout = ({ children }: any) => (
  <>
    <Helmet
        title="Gatsby Default Starter"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
    />
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0px 1.0875rem 4rem 1.45rem`,
        paddingTop: 0
      }}
    >
      {children}
    </div>
  </>
);

export default Layout;