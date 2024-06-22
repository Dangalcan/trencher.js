
/**
 * Generates an array of form field descriptors based on the properties of the given object.
 * Each property in the object determines the type and attributes of the corresponding form field.
 * Its recommended if you are trying to create a form in order to make a PUT or a PATCH 
 * request.
 * @param {Object} obj - The object whose properties will determine the form fields.
 * @returns {Object[]} Array of objects describing each form field, including label, name, type, accept, and isTextarea attributes.
 * @author Daniel Galván Cancio
*/
export function generateFormFieldsFromObject(obj) {
    return Object.entries(obj).map(([key, value]) => {
      let type = 'text' // Default type
      let accept = ''
      let isTextarea = false
      if (typeof value === 'number') {
        type = 'number'
      } else if (typeof value === 'boolean') {
        type = 'checkbox'
      } else if (typeof value === 'string') {
        if (value.match(/\.(jpeg|jpg|gif|png)$/)) {
          type = 'file'
          accept = 'image/*'
        } else if (value.match(/\.pdf$/)) {
          type = 'file'
          accept = 'application/pdf'
        } else if (value.match(/\.(doc|docx)$/)) {
          type = 'file'
          accept = 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        } else if (value.match(/\.(xls|xlsx)$/)) {
          type = 'file'
          accept = 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        } else if (value.match(/\.zip$/)) {
          type = 'file'
          accept = 'application/zip, application/x-zip-compressed'
        } else if (value.match(/https?:\/\/[^\s]+/)) {
          type = 'url'
        } else if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          type = 'email'
        } else if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
          type = 'date'
        } else if (value.length > 100) {
          // If the string is long, use textarea
          isTextarea = true
        }
      }
  
      return {
        label: key.charAt(0).toUpperCase() + key.slice(1), 
        name: key,
        type: type,
        accept: accept,
        isTextarea: isTextarea
      }
    })
  }
  