import React from 'react';
import PropTypes from 'prop-types';

export const Label = ({ description, htmlFor, styles }) => {
    return (
        <>
            <label
                className={`control-label ${styles}`}
                htmlFor={htmlFor}
            >
                {description}
            </label>
        </>
    );
}

Label.propTypes = {
    description: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
    styles: PropTypes.string,
}
