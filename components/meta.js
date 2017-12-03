import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const SITE_NAME = 'geo.data.gouv.fr'

const Meta = ({ title, description, images }) => (
  <Head>
    <title>{title} | {SITE_NAME}</title>
    <meta name='twitter:title' content={title} />
    <meta property='og:title' content={title} />

    {description && (
      <Fragment>
        <meta name='description' content={description} />
        <meta name='twitter:description' content={description} />
        <meta name='og:description' content={description} />
      </Fragment>
    )}

    {images && images.length > 0 && images.map((image, idx) => (
      <Fragment key={idx}>
        <meta name='twitter:image' content={image} />
        <meta name='og:image' content={image} />
      </Fragment>
    ))}
  </Head>
)

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string)
}

export default Meta
