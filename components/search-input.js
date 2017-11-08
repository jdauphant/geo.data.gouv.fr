import { format } from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'

import { translate } from 'react-i18next'

class SearchInput extends React.PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      query: PropTypes.object.isRequired
    }).isRequired,

    placeholder: PropTypes.string,

    hasButton: PropTypes.bool,
    defaultQuery: PropTypes.object,

    i18n: PropTypes.shape({
      language: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    defaultValue: '',

    hasButton: false
  }

  onSubmit = event => {
    event.preventDefault()

    const { router, i18n, defaultQuery } = this.props

    const url = format({
      pathname: '/search',
      query: {
        ...defaultQuery,
        ...router.query,
        q: event.target.query.value
      }
    })

    router.push(url, `/${i18n.language}${url}`)
  }

  render() {
    const { router, placeholder, hasButton, t } = this.props

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          name='query'
          defaultValue={router.query.q}
          placeholder={placeholder || t('components.SearchInput.placeholder')}
        />

        {hasButton && (
          <button type='submit' />
        )}

        <style jsx>{`
          form {
            width: 100%;
            position: relative;
          }

          input {
            display: block;
            width: 100%;
            border: 1px solid rgba(34, 36, 38, 0.15);
            border-radius: 2px;
            margin: 0;
            outline: 0;
            line-height: 2em;
            font-size: 1.5rem;
            padding: 10px 60px 10px 20px;

            &:focus,
            &:active {
              border-color: #85b7d9;
            }

            @media (max-width: 768px) {
              font-size: 1.2rem;
            }
          }

          button {
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            background: #fff;
            border: 0 none;
            cursor: pointer;
            width: 50px;
            padding: 0 5px;
            outline: 0;
            background: url('/static/images/icons/search.svg') center left no-repeat;
          }
        `}</style>
      </form>
    )
  }
}

export default translate()(withRouter(SearchInput))
