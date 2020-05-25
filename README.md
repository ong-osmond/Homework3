# 03 JavaScript: Password Generator

Create an application that generates a random password based on user-selected criteria. This app will run in the browser and feature dynamically updated HTML and CSS powered by your JavaScript code. It will also feature a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

## User Story

```
AS AN employee with access to sensitive data
I WANT to randomly generate a password that meets certain criteria
SO THAT I can create a strong password that provides greater security
```

## Acceptance Criteria

```
GIVEN I need a new, secure password

WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
>>  In script.js:
    var generateBtn = document.querySelector("#generate");
    generateBtn.addEventListener("click", writePassword);

WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
>>  In script.js:
    function generatePassword() 
    "requirements" object contains this method: "askPasswordLength: function ()"

WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
>>  In script.js:
    function generatePassword() 
    "requirements" object contains this method: "askRequirements: function ()"
    

WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
>>  In script.js:
    Used the confirm function to select a character type (OK for true or Cancel for false).
    While all criteria are false, then the user is alerted: ("At least one character type must be selected!");


WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
>>  In script.js:
    When writePassword() function is called, this in turn calls the generatePassword() function.
    The "getCharacters" object contains the character lists to generate the password from,
    a randomChar array to push the required character types to and to randomly select a character type from,
    and the methods to generate a character based on the required character type.
    The selected criteria are set up in the section //Generate minimum required characters.
    Then the for loop 
        "for (var p = getCharacters.generatedPassword.length;
        p < requirements.passwordLength;
        p++))"
    fills in the rest of the password.

WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
>> In script.js, this is performed by the function writePassword().