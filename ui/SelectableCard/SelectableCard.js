import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

class SelectableCard extends React.PureComponent {
  static propTypes = {
    Icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    onClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const {
      Icon,
      onClick,
      t,
      title,
    } = this.props

    return (
      <div className='selectable-card' onClick={onClick}>
        <div className='selectable-card-content'>
          <Icon />
          <div className='selectable-card-content-title'>{t(title)}</div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(SelectableCard)
