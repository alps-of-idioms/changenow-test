import React from 'react'

const ErrorIndicator = ({ error }) => {
  console.dir(error)
  return (
    <div className="error-indicator">
      <span>Произошла ошибка </span>
      <br />
      <span style={{ color: 'red' }}>{error.message}</span>
      <br />
      <span>Перезагрузите страницу</span>
    </div>
  )
}

export default ErrorIndicator
