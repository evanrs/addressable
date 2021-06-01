import AJV from 'ajv'

export const ajv = new AJV({
  strict: false,
  removeAdditional: 'all', // remove additional properties
  useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
  coerceTypes: true, // change data type of data to match type keyword
  allErrors: true, // check for all errors
})
