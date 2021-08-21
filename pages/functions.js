//FUNCTIONS

const randomStrings = (length = 8) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,./[]()"{}';
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    return result;
};

const randomNumbers = (length = 1) => {
    let result = '';
    let characters = '123456789';
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    return result;
};

const sumOperationResult = (randomNr1, randomNr2) => {
    let result = Number(randomNr1) + Number(randomNr2);
    return result;
};

const subtrOperationResult = (randomNr1, randomNr2) => {
    let result = Number(randomNr1) - Number(randomNr2);
    return result;
};

const multOperationResult = (randomNr1, randomNr2) => {
    let result = Number(randomNr1) * Number(randomNr2);
    return result;
};

const divOperationResult = (randomNr1, randomNr2) => {
    let result = Number(randomNr1) / Number(randomNr2);
    return result;
};

const conctnOperationResult = (randomNr1, randomNr2) => {
    let result = randomNr1 + randomNr2;
    return result;
};

module.exports = {randomStrings, randomNumbers, sumOperationResult, 
                subtrOperationResult, multOperationResult, 
                divOperationResult, conctnOperationResult};