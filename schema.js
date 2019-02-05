let schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "type": {
            "type": "string",
            "maxLength": 10,
            "minLength": 2,
            "errorMessage": {
                "type": "should be a string",
                "maxLength": "can't exceed max length of 10",
                "minLength": "should be greater than length of 2"
            }
        },
        "rank": {
            "type": "integer",
            "maximum": 1000,
            "minimum": 1
        },
        "isDemocratic": {
            "type": "boolean"
        }
    },
    "required": [
        "name",
        "type",
        "rank",
        "isDemocratic"
    ]
}

module.exports = schema;