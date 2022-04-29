import React, { Fragment } from 'react'
import Head from 'next/head'
import config from '../../configs/config.json'
import IndexView, { IndexViewProps } from '../organisms/IndexView'

export type IndexProps = IndexViewProps

const Index: React.FC<IndexProps> = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{config.siteName}</title>
        <meta name="viewpoint" content="initial-scale=1.0, with=device-width" />
        <meta name="description" content={config.siteName} />
        <meta property="og:title" content={`Top page - ${config.siteName}`} />
        <meta property="og:site_name" content={config.siteName} />
        <meta
          property="og:description"
          content={`top page of ${config.siteName}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={config.default_catch_image_url} />
      </Head>
      <IndexView {...props} />
    </Fragment>
  )
}
export default Index
