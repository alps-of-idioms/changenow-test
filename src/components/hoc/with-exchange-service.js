import React from 'react'
import { ExchangeServiceConsumer } from '../exchange-service-context'

export const withExchangeService = Wrapped => {
  return props => {
    return (
      <ExchangeServiceConsumer>
        {exchangeService => {
          return <Wrapped {...props} exchangeService={exchangeService} />
        }}
      </ExchangeServiceConsumer>
    )
  }
}
