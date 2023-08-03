import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const ShutterButton = ({
  isCountdownDisabled,
  numberOfCountdownSeconds,
  setCountdownStarted,
  takePhoto,
}) => {
  const countdownRef = useRef()
  const circleRef = useRef()
  const buttonRef = useRef()

  const [secondsLeft, setSecondsLeft] = useState(numberOfCountdownSeconds)
  const timerRef = useRef()

  const countDown = () => {
    if (secondsLeft === 0) {
      clearInterval(timerRef.current)
      timerRef.current = undefined
    }

    setSecondsLeft((prev) => prev - 1)
  }

  useEffect(() => {
    if (!isCountdownDisabled && secondsLeft > 0) {
      countdownRef.current.textContent = secondsLeft
    }
  }, [isCountdownDisabled, secondsLeft])

  const startTimer = () => {
    if (!timerRef.current && secondsLeft > 0) {
      timerRef.current = setInterval(countDown, 1000)
    }
  }

  const handleClick = () => {
    if (isCountdownDisabled) {
      takePhoto()
      return
    }

    setCountdownStarted(true)

    setSecondsLeft(numberOfCountdownSeconds)
    countdownRef.current.style.animation = 'none'
    buttonRef.current.style.animation = 'none'
    circleRef.current.style.animation = 'none'

    // eslint-disable-next-line no-void
    void countdownRef.current.offsetWidth // Trigger reflow to enable restarting the animation
    // eslint-disable-next-line no-void
    void buttonRef.current.offsetWidth // Trigger reflow to enable restarting the animation
    // eslint-disable-next-line no-void
    void circleRef.current.offsetWidth // Trigger reflow to enable restarting the animation

    countdownRef.current.style.opacity = '1'
    buttonRef.current.style.pointerEvents = 'none'
    buttonRef.current.style.animation = 'buttonFadeOut 0.25s linear forwards'
    circleRef.current.style.opacity = '1'
    circleRef.current.style.animation =
      'fadeIn 0.25s linear forwards, whiteStrokeGrowth 3s linear forwards'

    startTimer()

    setTimeout(() => {
      countdownRef.current.style.animation = 'fadeOut 0.25s linear forwards'
      circleRef.current.style.animation =
        'whiteStrokeGrowth 0s linear forwards, fadeOut 0.25s linear forwards'
      buttonRef.current.style.animation = 'buttonFadeIn 0.25s linear forwards'
      buttonRef.current.style.pointerEvents = 'auto'
      takePhoto()
    }, 3000)
  }

  useEffect(
    () => () => {
      if (!isCountdownDisabled && timerRef.current) {
        clearInterval(timerRef.current)
      }
    },
    [isCountdownDisabled],
  )

  return isCountdownDisabled ? (
    <button type='button' className='camera-shutter-button' onClick={takePhoto} />
  ) : (
    <button
      className='camera-shutter-button camera-shutter-button--with-countdown'
      onClick={handleClick}
      ref={buttonRef}
      type='button'
    >
      <svg width='80' height='80'>
        <circle
          ref={circleRef}
          cx='40'
          cy='40'
          r='36'
          strokeWidth='8'
          strokeDasharray='22 242'
          strokeLinecap='round'
          fill='none'
          stroke='#ffffff'
          style={{ opacity: 0 }}
        />
        <text
          ref={countdownRef}
          className='countdown'
          x='50%'
          y='55%'
          textAnchor='middle'
          dy='.3em'
          style={{ opacity: 0 }}
        >
          {numberOfCountdownSeconds}
        </text>
      </svg>
    </button>
  )
}

ShutterButton.propTypes = {
  isCountdownDisabled: PropTypes.bool,
  numberOfCountdownSeconds: PropTypes.number,
  setCountdownStarted: PropTypes.func,
  takePhoto: PropTypes.func.isRequired,
}

ShutterButton.defaultProps = {
  isCountdownDisabled: false,
  numberOfCountdownSeconds: 3,
  setCountdownStarted: () => {},
}

export default ShutterButton
