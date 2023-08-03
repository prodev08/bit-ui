import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const CountdownTimer = ({ seconds }) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds)

  useEffect(() => {
    if (secondsLeft === 0) {
      setSecondsLeft(null)
    }
    if (!secondsLeft) return

    const timer = setInterval(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  return (
    <span>{secondsLeft}</span>
  )
}

CountdownTimer.propTypes = {
  seconds: PropTypes.number.isRequired,
}

export default CountdownTimer
