import React from "react"
import PropTypes from "prop-types"

/**
 * Functional component representing a form group with a labeled input field.
 * 
 * @param {Object} props - Props object containing label, name, type, accept, and required attributes.
 * @param {string} props.label - The label text associated with the input field.
 * @param {string} props.name - The unique name/id of the input field.
 * @param {string} props.type - The type of input field (`text`, `number`, etc.).
 * @param {string} [props.accept=''] - Optional file types accepted by the input field.
 * @param {boolean} [props.required=false] - Optional Boolean indicating if the input field is required.
 * @returns {JSX.Element} React component that renders a form group with a labeled input field.
 * @author Daniel Galván Cancio 
*/
export default function FormGroup({ label, name, type, accept = '', required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} accept={accept} required={required} />
    </div>
  )
}
FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  accept: PropTypes.string,
  required: PropTypes.bool
}

