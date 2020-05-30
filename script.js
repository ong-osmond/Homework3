// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword(); //The generatePassword function must return a value 
  alert("Password generated! \n" + password); //Alert the password that was generated
  var passwordText = document.querySelector("#password"); //Look for the password ID in the DOM
  passwordText.value = password; //Assign our generated password to that text
}

// The heart of this application
function generatePassword() {

  //Requirements object
  var Requirements = {
    passwordLength: 0, //Defaults passwordLength to zero
    minPasswordLength: 8, //Sets the minimum password length to a configurable value
    maxPasswordLength: 128, //Sets the maximum password length to a configurable value
    lowerCase: false, //Defaults character types to false
    upperCase: false, //Defaults character types to false
    numbers: false, //Defaults character types to false
    specialChar: false, //Defaults character types to false
    askPasswordLength: function () {
      var passwordLength = (prompt("How long must the password be? (Choose from " + this.minPasswordLength + " to " + this.maxPasswordLength + " characters.)"));
      //Check if number entered is a whole number
      if (passwordLength % 1 != 0) {
        this.passwordLength = 0;
        alert("Invalid password length.");
      }
      else
        //Get the number value entered
        this.passwordLength = passwordLength.replace(/\D/g, "");
      //Check if value is not a number
      if (this.passwordLength == isNaN
      ) {
        this.passwordLength = 0;
        alert("Invalid password length.");
      }
    },
    askRequirements: function () {
      this.lowerCase = confirm("Require lower case characters? \n(OK for Yes, Cancel for No.)");
      this.upperCase = confirm("Require upper case characters? \n(OK for Yes, Cancel for No.)");
      this.numbers = confirm("Require numbers? \n(OK for Yes, Cancel for No.)");
      this.specialChar = confirm("Require special characters? \n(OK for Yes, Cancel for No.)");
    }
  }

  //Password Generator object
  var Password = {
    lowerCaseSet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    upperCaseSet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    numberSet: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    specialCharSet: ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", "-", ".", "/", ":", ";", "<", "=", ">",
      "?", "@", "[", "]", "^", "_", "{", "|", "}", "~"],
    possibleCharacters: [], //Builds the list of characters to randomly choose from
    generatedPassword: "", //The actual password to be generated
  }


  //Begin Main function//

  //Ask password length
  Requirements.askPasswordLength();
  while (Requirements.passwordLength < Requirements.minPasswordLength ||
    Requirements.passwordLength > Requirements.maxPasswordLength
  ) {
    alert("Choose from " + Requirements.minPasswordLength + " to " + Requirements.maxPasswordLength + " characters.");
    Requirements.askPasswordLength();
  }
  //Ask required character types
  Requirements.askRequirements();
  while (!Requirements.lowerCase &&
    !Requirements.upperCase &&
    !Requirements.numbers &&
    !Requirements.specialChar
  ) {
    alert("At least one character type must be selected!");
    Requirements.askRequirements();
  }

  //Generate minimum required characters (if we create the possibleCharacters array before this step, it's possible the "for loop" may never randomly pick the required character type/s)
  if (Requirements.lowerCase) {
    Password.generatedPassword = Password.generatedPassword + Password.lowerCaseSet[Math.floor(Math.random() * Password.lowerCaseSet.length)];
    Password.possibleCharacters = Password.possibleCharacters.concat(Password.lowerCaseSet);
  }
  if (Requirements.upperCase) {
    Password.generatedPassword = Password.generatedPassword + Password.upperCaseSet[Math.floor(Math.random() * Password.upperCaseSet.length)];
    Password.possibleCharacters = Password.possibleCharacters.concat(Password.upperCaseSet);
  }
  if (Requirements.numbers) {
    Password.generatedPassword = Password.generatedPassword + Password.numberSet[Math.floor(Math.random() * Password.numberSet.length)];
    Password.possibleCharacters = Password.possibleCharacters.concat(Password.numberSet);
  }
  if (Requirements.specialChar) {
    Password.generatedPassword = Password.generatedPassword + Password.specialCharSet[Math.floor(Math.random() * Password.specialCharSet.length)];
    Password.possibleCharacters = Password.possibleCharacters.concat(Password.specialCharSet);
  }
  console.log(Password.generatedPassword);
  //console.log("Remaining chars to fill in: " + (Requirements.passwordLength - Password.generatedPassword.length));

  //Fill in the rest of the password
  for (var p = Password.generatedPassword.length;
    p < Requirements.passwordLength;
    p++) {
    Password.generatedPassword = Password.generatedPassword
      + Password.possibleCharacters[Math.floor(Math.random() * Password.possibleCharacters.length)];
  }
  //Initial Generated Password
  console.log(Password.generatedPassword);

  //Generated Password must be shuffled to randomise value (we don't want the the password to always begin in the order of the required character types - see lines 85 to 103)
  function scramble(a) {
    a = a.split("");
    for (var b = a.length - 1; 0 < b; b--) {
      var c = Math.floor(Math.random() * (b + 1)); d = a[b]; a[b] = a[c]; a[c] = d
    }
    return a.join("")
  }

  //Final Password
  return (scramble(Password.generatedPassword));
}