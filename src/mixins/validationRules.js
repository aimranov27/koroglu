const forbiddenCharacters = [""]
export default {
    methods: {
        emptyString(stringValue) {
            return stringValue.length === 0;
        },
        validString(stringValue) {
            let containForbiddenCharacters = forbiddenCharacters.reduce((result, currentCharacter) => {
                return result || stringValue.includes(currentCharacter);
            }, false);
            return !this.emptyString(stringValue) && !containForbiddenCharacters;
        },
        isInteger(stringValue) {
            let integerRegex = new RegExp(/^-?\d+$/);
            return !!stringValue.match(integerRegex);
        },
        isPositiveInteger(stringValue) {
            let integerRegex = new RegExp(/^\d+$/);
            return !!stringValue.match(integerRegex);
        },
        isDouble(stringValue) {
            let integerRegex = new RegExp(/^-?\d+(\.\d+)?$/);
            return !!stringValue.match(integerRegex);
        },
        isPositiveDouble(stringValue) {
            let integerRegex = new RegExp(/^\d+(\.\d+)?$/);
            return !!stringValue.match(integerRegex);
        }
    }
};
