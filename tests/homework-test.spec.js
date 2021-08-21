const { test, expect } = require('@playwright/test');
const { CalStartPage } = require('../pages/calculatorStartPage');
const { randomStrings } = require('../pages/functions');
const { randomNumbers } = require('../pages/functions');
const { sumOperationResult } = require('../pages/functions');
const { subtrOperationResult } = require('../pages/functions');
const { multOperationResult } = require('../pages/functions');
const { divOperationResult } = require('../pages/functions');
const { conctnOperationResult } = require('../pages/functions');

const prototypes = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const build = '#selectBuild';
const numberFields = ['#number1Field', '#number2Field'];
const calculateBtn = '#calculateButton';
const errorMessages = '#errorMsgField';
const operationButton = '#selectOperationDropdown';
const operationButton2 = "#selectOperationDropdown";
const answer = '#numberAnswerField';
const integersOnly = '#integerSelect';
const clearBtn = '#clearButton';

const randomNr1 = randomNumbers();
const randomNr2 = randomNumbers();

// run with: npx playwright test --grep @it-only
test.describe('Calculator test suite', () => {
    let page;
    
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        startPage = new CalStartPage(page);
    });
    test.beforeEach(async () => {
    await startPage.goto();
    await page.click(build);
    const prototypeSelect = await page.$("#selectBuild");
    await prototypeSelect?.selectOption("0"); // change build number from 0 to 9 here!   
});
/*------------------------------------------------------------------TESTS--------------------------------------------------------------------------------//
   Beveik visur yra įdėti confimations (išskyrus 9 build), kad patikrint ar passed testas yra be klaidų. Tam pridėjau, kad konsolėje rodytų klaidas. 
   Nežinau ar tai tikslinga - leisti visiems testams passinti ir jų errors rodyti konsolėje. 
   Ar geriau, kad testas failintų ir tada būtų ieškoma klaida, kodėl jis failino?
//------------------------------------------------------------------------------------------------------------------------------------------------------*/
    /* Tests drop down menu select options*/
    let results = false;
    test('Does drop down menu arrays match @not-it', async () => {
        await page.click(build);
        const prototypeExists = await page.evaluate(() => Array.from(document.getElementById("selectBuild"), e => e.textContent));
        
        if(prototypeExists.length === prototypes.length) {
            for(let i = 0; i < prototypeExists.length; i++) {
                if(prototypeExists[i] === prototypes[i]) {
                    results = true;
                }
                else {
                    results = false;
                    console.log("Drop down menu arrays don't match!");
                    break;
                }
            }
        }
        else {
            console.log("Drop down menu arrays are different lengths!");
        }
        expect(results).toBe(true);
    });

    /*Checks if number input fields accept non-number inputs and show appropriate error messages*/
    numberFields.forEach(field => {
        test(`Do ${field} fields accept non-number inputs and show errors @it-only`, async () => {
            await page.fill(field, randomStrings());
            await page.click(calculateBtn);
            const error1 = await page.textContent(errorMessages);
            if(error1 != "") {
                if(`${field}` == '#number1Field' && error1 == 'Number 1 is not a number') {
                    expect(error1).toContain('Number 1 is not a number');
                }
                else if (`${field}` == '#number2Field' && error1 == 'Number 2 is not a number') {
                    expect(error1).toContain('Number 2 is not a number');
                }
                else {
                    console.log("Wrong error message!"); //this message is displayed in the console if an error message label is wrong
                }
            }
            else {
                console.log("Error message is empty!"); // this message is displayed in the console if an error message label is empty
            }         
        });
    });

    /*Operacijų tikrinimui norėjau padaryti vieną testą, bet per aptarimą minėjot, 
      kad geriau, jei testai yra trumpi, tai operacijų testus išskaidžiau į atskirus testus.*/
    test('Is the output correct for Add operation @it-only', async () => {
        await page.fill(numberFields[0], randomNr1);
        await page.fill(numberFields[1], randomNr2);
        await page.click(operationButton);
        const operationSelect = await page.$(operationButton2);
        await operationSelect?.selectOption("0");
        await page.click(calculateBtn);
        const resultText = await page.inputValue(answer);
        const result = Number(resultText);
        const sum = sumOperationResult(randomNr1, randomNr2);
        if(result === sum) {
            expect(result).toEqual(sum);
        }
        else {
            console.log("Add operation is not working properly! "); // this message is displayed in the console if the operation expected and recieved results don't match
        }
    });

    test('Is the output correct for Subtract operation @it-only', async () => {
        await page.fill(numberFields[0], randomNr1);
        await page.fill(numberFields[1], randomNr2);
        await page.click(operationButton);
        const operationSelect = await page.$(operationButton2);
        await operationSelect?.selectOption("1");
        await page.click(calculateBtn);
        const resultText = await page.inputValue(answer);
        const result = Number(resultText);
        const subtraction = subtrOperationResult(randomNr1, randomNr2);
        if(result === subtraction) {
            expect(result).toEqual(subtraction);
        }
        else {
            console.log("Subtract operation is not working properly!"); // this message is displayed in the console if the operation expected and recieved results don't match
        }
    });

    test('Is the output correct for Multiply operation @it-only', async () => {
        await page.fill(numberFields[0], randomNr1);
        await page.fill(numberFields[1], randomNr2);
        await page.click(operationButton);
        const operationSelect = await page.$(operationButton2);
        await operationSelect?.selectOption("2");
        await page.click(calculateBtn);
        const resultText = await page.inputValue(answer);
        const result = Number(resultText);
        const multiply = multOperationResult(randomNr1, randomNr2);
        if(result === multiply) {
            expect(result).toEqual(multiply);
        }
        else {
            console.log("Multiply operation is not working properly!"); // this message is displayed in the console if the operation expected and recieved results don't match
        }
    });

    test('Is the output correct for Divide operation @it-only', async () => {
        await page.fill(numberFields[0], randomNr1);
        await page.fill(numberFields[1], randomNr2);
        await page.click(operationButton);
        const operationSelect = await page.$(operationButton2);
        await operationSelect?.selectOption("3");
        await page.click(calculateBtn);
        const resultText = await page.inputValue(answer);
        const result = Number(resultText);
        const divide = divOperationResult(randomNr1, randomNr2);
        if(result === divide) {
            expect(result).toEqual(divide);
        }
        else {
            console.log("Divide operation is not working properly!"); // this message is displayed in the console if the operation expected and recieved results don't match
        }
    });

    test('Is the output correct for Concatenate operation @it-only', async () => {
        await page.fill(numberFields[0], randomNr1);
        await page.fill(numberFields[1], randomNr2);
        await page.click(operationButton);
        const operationSelect = await page.$(operationButton2);
        await operationSelect?.selectOption("4");
        await page.click(calculateBtn);
        const resultText = await page.inputValue(answer);
        const concatenate = conctnOperationResult(randomNr1, randomNr2);
        if(resultText === concatenate) {
            expect(resultText).toContain(concatenate);
        }
        else {
            console.log("Concatenate operation is not working properly!"); // this message is displayed in the console if the operation expected and recieved results don't match
        }
    });

    test('Can integer chechbox be checked @not-it', async () => {
        const checkboxStatus = await page.isDisabled(integersOnly);
        if(checkboxStatus == false) {
            await page.click(integersOnly);
            const isChecked = await page.isChecked(integersOnly);
            expect(isChecked).toBe(true);
        }
        else {
            console.log("Checkbox is disabled!"); // this message is displayed in the console if the checkbox is disabled
        }
    });

    // Does the clear button delete the answer and the checked integer checkbox
    test('Does clear button work @not-it', async () => {
        const buttonStatus = await page.isDisabled(clearBtn);
        if(buttonStatus == false) {
            await page.fill(numberFields[0], randomNr1);
            await page.fill(numberFields[1], randomNr2);
            let isChecked = await page.isChecked(integersOnly);
            if(isChecked == true)
            {
                await page.click(calculateBtn);
                console.log("Integers only checkbox was already checked!"); // this message is displayed in the console if the integer checbox is checked by default
            }
            else {
                await page.click(integersOnly);
                await page.click(calculateBtn);
                isChecked = await page.isChecked(integersOnly);
            }  
            let resultText = await page.inputValue(answer);
            if(resultText != "" || isChecked == true) {
                await page.click(clearBtn);
                resultText = await page.inputValue(answer);
                isChecked = await page.isChecked(integersOnly);
                expect(resultText).toContain("");
                expect(isChecked).toBe(false);
            }
        }
        else {
            console.log("Button is disabled!"); // this message is displayed in the console if the clear button is disabled
        }
    });

    numberFields.forEach(field => {
        test(`Does Concatinate function work with non-numeric inputs in ${field} @it-only`, async () => {
            await page.fill(field, randomStrings());
            const operationSelect = await page.$(operationButton2);
            await operationSelect?.selectOption("4");
            await page.click(calculateBtn);
            const error1 = await page.textContent(errorMessages);
            if(`${field}` == '#number1Field' && error1 != 'Number 1 is not a number') {
                expect(error1).toContain("");
            }
            else if (`${field}` == '#number2Field' && error1 != 'Number 2 is not a number') {
                expect(error1).toContain("");
            }
            else {
                console.log("An error message is shown!"); //this message is displayed in the console if an error message is shown
            }
        });
    });

    test('Does integers only checkbox disappear if Concatinate is chosen @not-it', async () => {
        const operationSelect = await page.$(operationButton2);
        await operationSelect?.selectOption("4");
        const checboxVisible = await page.isVisible(integersOnly);
        if(checboxVisible == false)
        {
            expect(checboxVisible).toBe(false);
        }
        else {
            console.log("Checbox is visible!"); //this message is displayed in the console if the checkbox is visible
        }
    });

    test('Does integers only give the right answer @it-only', async () => {
        await page.fill(numberFields[0], randomNr1);
        await page.fill(numberFields[1], randomNr2);
        await page.click(operationButton);
        const operationSelect = await page.$(operationButton2);
        await operationSelect?.selectOption("3");
        await page.click(integersOnly);
        await page.click(calculateBtn);
        const resultText = await page.inputValue(answer);
        const parsedResults = parseInt(resultText);
        const result = Number.isInteger(parsedResults);
        if(result == true) {
            expect(result).toBe(true);
        }
        else {
            console.log("Divide operation is not working properly!"); // this message is displayed in the console if the operation expected and recieved results don't match
        }
    });
});
    

    