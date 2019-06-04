import React from 'react'
import PropTypes from 'prop-types'
import Selectbox from '../selectbox'
import { withClickOutside } from 'react-clickoutside'

const SelectboxWithOutside = withClickOutside({
  className: 'selectbox__withhoc',
})(Selectbox)

const CurrencySelectbox = ({
  number,
  chosenCurrency,
  toggleSelectboxHandler,
  onClickOutside,
  isOpen,
}) => {
  return (
    <div
      className={`exchange-currency__selectbox`}
      onClick={() => toggleSelectboxHandler(number)}
    >
      <span className={`exchange-currency__abbreviation`}>
        {chosenCurrency.toUpperCase()}
      </span>
      <div className={`exchange-currency__arrowdown`}>
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

CurrencySelectbox.propTypes = {
  number: PropTypes.string.isRequired,
  chosenCurrency: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleSelectboxHandler: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
}

export default CurrencySelectbox
