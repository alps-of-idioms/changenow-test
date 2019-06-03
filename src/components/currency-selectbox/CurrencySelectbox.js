import React from 'react'
import Selectbox from '../selectbox'
import { withClickOutside } from 'react-clickoutside'

const SelectboxWithOutside = withClickOutside()(Selectbox)

const CurrencySelectbox = ({
  chosenCurrency,
  toggleSelectboxHandler,
  onClickOutside,
  isOpen,
  number,
}) => {
  return (
    <div className="first-currency__selectbox" onClick={toggleSelectboxHandler}>
      <span className="first-currency__selectbox--abbreviation">
        {chosenCurrency.toUpperCase()}
      </span>
      <div className="first-currency__selectbox--arrowdown">
        <svg width="6pt" height="6pt" viewBox="0 0 6 6" version="1.1">
          <g id="surface1">
            <path
              style={{
                stroke: 'none',
                fillRule: 'nonzero',
                fill: 'rgb(0, 0, 0)',
                fillOpacity: 1,
              }}
              d="M 0 1.5 L 3 4.5 L 6 1.5 Z M 0 1.5 "
            />
          </g>
        </svg>
      </div>
      {isOpen && (
        <SelectboxWithOutside
          number={number}
          toggleSelectboxHandler={toggleSelectboxHandler}
          onClickOutside={onClickOutside}
        />
      )}
    </div>
  )
}

export default CurrencySelectbox
