import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that wraps a form and handles form submission via a specified method.
 * Using TrencherApiRequestsHelper methods are strongly recommended
 *
 * @param {Object} props - Props object containing url, method, onSubmitSuccess, onSubmitError, and children attributes.
 * @param {string} props.url - The URL endpoint where the form data will be submitted. Remember to specify
 * full URL if you dont want to set the APIBaseURL
 * @param {function} props.method - The method to be used for form submission (e.g., fetch, axios.post).
 * TrencherApiRequestsHelper methods are recommended
 * @param {function} [props.onSubmitSuccess] - Optional callback function invoked when form submission succeeds.
 * @param {function} [props.onSubmitError] - Optional callback function invoked when form submission fails.
 * @param {ReactNode} props.children - Child components or elements that will be rendered inside the form.
 * @returns {JSX.Element} React component that renders a form and manages its submission.
 * @author Daniel Galván Cancio
 */
export default function FormWrapper({
  url,
  method,
  onSubmitSuccess = () => alert('Data submmitted correctly'),
  onSubmitError = () => alert('There was an error submiting the data'),
  children,
}) {
  const formRef = useRef();

  /**
   * Handles form submission.
   * Prevents default form submission behavior, gathers form data, and submits it via the specified method.
   * Calls onSubmitSuccess on successful submission and onSubmitError on failure.
   *
   * @param {Event} event - The form submission event.
   * @author Daniel Galván Cancio
   */
  function handleSubmit(event) {
    event.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);

    method(url, formData)
      .then((data) => {
        onSubmitSuccess(data);
      })
      .catch((error) => {
        onSubmitError(error);
      });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

FormWrapper.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  children: PropTypes.node.isRequired,
};
