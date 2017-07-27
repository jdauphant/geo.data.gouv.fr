import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import DocumentTitle from 'react-document-title'

import Loader from 'common/components/Loader'
import CatalogPreview from 'common/components/CatalogPreview'

import styles from './CatalogsListPage.scss'

const CatalogsListPage = ({ catalogs, pending, error, t }) => (
  <DocumentTitle title={t('CatalogsListPage.documentTitle')}>
    <div className={styles.container}>
      <Loader loading={pending} error={error}>
        <div>
          {catalogs.map(catalog => (
            <div key={catalog._id} className={styles.catalog} >
              <CatalogPreview catalog={catalog} />
            </div>
          ))}
        </div>
      </Loader>
    </div>
  </DocumentTitle>
)

CatalogsListPage.propTypes = {
  catalogs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,

  pending: PropTypes.bool.isRequired,

  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Catalogs.CatalogsList')(CatalogsListPage)
