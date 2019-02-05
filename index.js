/**
 * we kept the schema id to 'auto' to support draft-04, draft-05, draft-06, draft-07, of json schema validation  
 */
const ajv = new require('ajv')({
    schemaId: 'auto',
    allErrors: true,
    jsonPointers: true
});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
/**
 * We added ajv-errors module to our ajv schema engine since we want to give our custom messages in case
 * of data checking
 * 1. keepErrors decide whether or not we want to keep original errors given by ajv engine
 * 2. singleError tells whether to check full json in one go and prompt for all errors or stop 
 *    validation as soon as first error is encountered
 */
require('ajv-errors')(ajv, {
    keepErrors: false,
    singleError: false
});

const schema = require("./schema");
const compiledSchema = ajv.compile(schema);

const correctData = {
    name: "INDIA",
    type: "COUNTRY",
    rank: 1,
    isDemocratic: true
}
/**
 * This is going to be true, since we followed all the norms of the schema
 */
const validForCorrectData = compiledSchema(correctData);
console.log('I am against correct data ', validForCorrectData);

/**
 * This data passed a wrong format of type param, it is mentioned to be 'String' but it is 'boolean' here
 * because of that the error message of type is going to be picked up
 */
const inCorrectData = {
    name: "INDIA",
    type: true,
    rank: 1,
    isDemocratic: true
}
const validForInCorrectData = compiledSchema(inCorrectData);
console.log('I am against incorrect data ', validForInCorrectData);
if (!validForInCorrectData) console.log(compiledSchema.errors);