import React from 'react'
import { translate, Interpolate } from 'react-i18next'
import PropTypes from 'prop-types'

import { Button } from 'common/components/Buttons'

import { checkLicense, checkProducers, checkDataAvailability } from 'common/helpers/dataGouvChecks'

import { CheckLicense, CheckProducers, CheckDataAvailability } from '../DatasetChecks'

import styles from './DatasetDataGouvPublication.scss'

class DatasetDataGouvPublication extends React.PureComponent {
  static propTypes = {
    dataset: PropTypes.shape({
      metadata: PropTypes.shape({
        license: PropTypes.string
      }).isRequired,

      organizations: PropTypes.array.isRequired,

      dataset: PropTypes.shape({
        distributions: PropTypes.array.isRequired
      }).isRequired
    }).isRequired,

    publication: PropTypes.shape({
      remoteUrl: PropTypes.string.isRequired
    }),

    t: PropTypes.func.isRequired
  }

  state = {
    expanded: false
  }

  toggleDetails = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render () {
    const { dataset, publication, t } = this.props
    const { expanded } = this.state

    const licenseCheck = checkLicense(dataset.metadata.license)
    const producersCheck = checkProducers(dataset.organizations)
    const dataAvailabilityCheck = checkDataAvailability(dataset.dataset.distributions)

    if (licenseCheck && producersCheck && dataAvailabilityCheck) {
      if (publication) {
        return (
          <div>
            <a href={publication.remoteUrl}>{t('DatasetDataGouvPublication.dvgLink')}</a>
          </div>
        )
      } else {
        return (
          <div>
            <Interpolate i18nKey='DatasetDataGouvPublication.canBePublished'
              bold={<b>{t('DatasetDataGouvPublication.can')}</b>}
            />
            <div className={styles.highlight}>{t('DatasetDataGouvPublication.producerActionNeeded')}</div>
          </div>
        )
      }
    } else {
      return (
        <div className={styles.checklist}>
          <Interpolate i18nKey='DatasetDataGouvPublication.cantBePublished'
            bold={<b>{t('DatasetDataGouvPublication.canNot')}</b>}
          />
          {expanded && (
            <div>
              <CheckLicense license={dataset.metadata.license} valid={licenseCheck} />
              <CheckProducers organizations={dataset.organizations} valid={producersCheck} />
              <CheckDataAvailability distributions={dataset.dataset.distributions} valid={dataAvailabilityCheck} />
            </div>
          )}
          <Button text={expanded ? t('DatasetDataGouvPublication.hide') : t('DatasetDataGouvPublication.show')} action={this.toggleDetails} />
        </div>
      )
    }
  }
}

export default translate('Dataset')(DatasetDataGouvPublication)
