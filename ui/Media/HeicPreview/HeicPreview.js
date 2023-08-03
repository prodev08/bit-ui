import React from 'react'
import PropTypes from 'prop-types'
import heic2any from 'heic2any'
import { Spinner } from '@blueprintjs/core'

import Image from 'ui/Media/Image'

class HeicPreview extends React.PureComponent {
  static propTypes = {
    isContextMenuDisabled: PropTypes.bool,
    rotation: PropTypes.number,
    src: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isContextMenuDisabled: false,
    rotation: 0,
  }

  state = {
    isConverting: false,
    isLoading: false,
    objectURL: '',
  }

  componentDidMount() {
    this.prepareHeic()
  }

  convertHeicToJpg = (blob) => {
    this.setState({ isConverting: true })

    return heic2any({ blob, toType: 'image/jpeg' })
      .then((data) => {
        const objectURL = URL.createObjectURL(data)
        this.setState({
          isConverting: false,
          objectURL,
        })
      })
      .catch(() => {
        // try to display the original image, will work in case image has inaccurate .heic extension
        const objectURL = URL.createObjectURL(blob)
        this.setState({
          isConverting: false,
          objectURL,
        })
      })
  }

  prepareHeic = () => {
    const { src } = this.props

    this.setState({ isLoading: true })
    fetch(src).then((res) => res.blob())
      .then((blob) => {
        this.setState({ isLoading: false })
        this.convertHeicToJpg(blob)
      })
      .catch(() => this.setState({ isLoading: false }))
  }

  componentWillUnmount() {
    const { objectURL } = this.state

    if (objectURL) {
      URL.revokeObjectURL(objectURL)
    }
  }

  render() {
    const { isConverting, isLoading, objectURL } = this.state
    const { isContextMenuDisabled, rotation, t } = this.props

    if (isConverting || isLoading) {
      return (
        <div className='heic-preview-load'>
          <Spinner />
          <div className='heic-preview-load-title'>
            {isLoading ? t('helpers.upload') : t('converting_to_jpg')}
          </div>
        </div>
      )
    }

    return (
      <Image
        className='heic-preview'
        isContextMenuDisabled={isContextMenuDisabled}
        rotation={rotation}
        src={objectURL}
      />
    )
  }
}

export default HeicPreview
