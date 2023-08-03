import React from 'react'
import PropTypes from 'prop-types'
import { Classes, Dialog, Switch } from '@blueprintjs/core'

import Button from 'ui/Button'
import Tooltip from 'ui/Tooltip'

import ObjectKeysFilter from './ObjectKeysFilter'

class ObjectKeysFilterModal extends React.PureComponent {
  static propTypes = {
    autocompleteKeys: PropTypes.array,
    isPersisted: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    limit: PropTypes.number,
    onApply: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onPersistChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    autocompleteKeys: [],
    limit: null,
  }

  state = {
    isOpen: false,
  }

  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  }

  onClose = () => {
    const { onCancel } = this.props
    this.setState({ isOpen: false })
    onCancel()
  }

  onApply = () => {
    const { onApply } = this.props
    this.setState({ isOpen: false })
    onApply()
  }

  onPersistChange = (e) => {
    const { onPersistChange } = this.props
    const { checked } = e.target
    onPersistChange(checked)
  }

  render() {
    const { isOpen } = this.state
    const {
      autocompleteKeys, isPersisted, items, limit, onChange, t,
    } = this.props

    return (
      <div className='object-keys-filter-modal'>
        <Button onClick={this.toggleModal} className='bp3-button--small'>{t('keys_filter')}</Button>

        <Dialog
          className='object-keys-filter-modal--dialog'
          isOpen={isOpen}
          onClose={this.onClose}
        >
          <div className={Classes.DIALOG_HEADER}>
            <div className='bp3-heading'>
              <span className='object-keys-filter-modal-title'>{t('keys_filter')}</span>
              <Tooltip content={t('persist')}>
                <Switch checked={isPersisted} onChange={this.onPersistChange} className='object-keys-filter-modal-switch' />
              </Tooltip>
            </div>
          </div>
          <div className={Classes.DIALOG_BODY}>
            <ObjectKeysFilter
              autocompleteKeys={autocompleteKeys}
              items={items}
              limit={limit}
              onChange={onChange}
            />
          </div>

          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.onClose}>
                {t('modals.cancel')}
              </Button>
              <Button onClick={this.onApply} type='primary'>
                {t('modals.apply')}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default ObjectKeysFilterModal
