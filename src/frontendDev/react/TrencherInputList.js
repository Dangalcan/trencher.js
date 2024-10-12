import React from 'react';
import FormGroup from './TrencherFormGroup';
import PropTypes from 'prop-types';

/**
 * Component that renders a list of form input fields based on the provided `fields` array.
 * Uses the `FormGroup` component to render each individual input field.
 *
 * @param {Object} props - Props object containing fields attribute.
 * @param {Object[]} props.fields - Array of objects describing each input field.
 * @param {string} props.fields[].label - The label text associated with the field.
 * @param {string} props.fields[].name - The unique name of the field.
 * @param {string} props.fields[].type - The input type (`text`, `number`, etc.) for `input` or `textarea`.
 * @param {string} [props.fields[].accept] - Optional `accept` attribute for file types in `input`.
 * @param {boolean} [props.fields[].required] - Optional Boolean indicating if the input field is required.
 * @returns {JSX.Element} React component that renders a list of form input fields.
 * @author Daniel Galván Cancio
 */
export default function InputList({ fields }) {
  return (
    <>
      {fields.map((field) => (
        <FormGroup
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          accept={field.accept}
          required={field.required}
        />
      ))}
    </>
  );
}

InputList.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      accept: PropTypes.string,
      required: PropTypes.bool,
    }),
  ).isRequired,
};
