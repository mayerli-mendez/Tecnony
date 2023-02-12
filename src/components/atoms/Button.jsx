import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ name, type, styles,disabled }) => {
    return (
        <>
            <button
                className={`btn btn-outline-danger btn-block ${styles}`}
                type={type}
                disabled={disabled}
            >
                {name}
            </button>
        </>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    styles: PropTypes.string,
}

Button.defaultProps = {
    type: 'submit',
}