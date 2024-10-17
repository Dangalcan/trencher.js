// /**
//  * Functional component that renders a compact list of input fields based on the structure provided in the `fields` array.
//  *
//  * @param {Object[]} fields - Array of objects describing each input field.
//  * @param {string} fields[].label - The label text associated with the field.
//  * @param {string} fields[].name - The unique name of the field.
//  * @param {string} fields[].type - The input type (`text`, `number`, etc.) for `input` or `textarea`.
//  * @param {string} fields[].accept - Optional `accept` attribute for file types in `input`.
//  * @param {boolean} fields[].isTextarea - Boolean indicating if the field is a `textarea`.
//  * @returns {JSX.Element} React component that renders the list of input fields.
//  * @author Daniel Galván Cancio
//  */
// export default function CompactInputList({ fields }) {
//   return (
//     <>
//       {fields.map(({ label, name, type, accept, isTextarea }) => (
//         <div key={name} className="form-group">
//           <label htmlFor={name}>{label}</label>
//           {isTextarea ? (
//             <textarea name={name} id={name} required></textarea>
//           ) : (
//             <input type={type} name={name} id={name} accept={accept} required />
//           )}
//         </div>
//       ))}
//     </>
//   );
// }

import React from 'react';

/**
 * Functional component that renders a compact list of input fields based on the structure provided in the `fields` array.
 *
 * @param {Object[]} fields - Array of objects describing each input field.
 * @param {string} fields[].label - The label text associated with the field.
 * @param {string} fields[].name - The unique name of the field.
 * @param {string} fields[].type - The input type (`text`, `number`, etc.) for `input` or `textarea`.
 * @param {string} fields[].accept - Optional `accept` attribute for file types in `input`.
 * @param {boolean} fields[].isTextarea - Boolean indicating if the field is a `textarea`.
 * @returns {React.Element} React component that renders the list of input fields.
 * @author Daniel Galván Cancio
 */
export default function CompactInputList({ fields }) {
  return React.createElement(
    React.Fragment,
    null,
    fields.map(({ label, name, type, accept, isTextarea }) => {
      return React.createElement(
        'div',
        { key: name, className: 'form-group' },
        React.createElement('label', { htmlFor: name }, label),
        isTextarea
          ? React.createElement('textarea', {
              name,
              id: name,
              required: true,
            })
          : React.createElement('input', {
              type,
              name,
              id: name,
              accept,
              required: true,
            })
      );
    })
  );
}
