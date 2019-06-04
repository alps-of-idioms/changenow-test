import React from 'react'
import { ExchangeConsumer } from '../exchange-context'

export const withExchange = Wrapped => {
  return props => {
    return (
      <ExchangeConsumer>
        {dataPackage => {
          return <Wrapped {...props} dataPackage={dataPackage} />
        }}
      </ExchangeConsumer>
    )
  }
}
