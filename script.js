// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  alert("Password generated! \n" + password);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {
  //Requirements object
  var requirements = {
    passwordLength: 0,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    lowercase: false,
    uppercase: false,
    numbers: false,
    specialChar: false,
    askPasswordLength: function () {
      var passwordLength = (prompt("How long must the password be? (Choose from " + this.minPasswordLength + " to " + this.maxPasswordLength + " characters.)"));
      this.passwordLength = passwordLength.replace(/\D/g, "");
      if (this.passwordLength == isNaN) {
        this.passwordLength = 0;
        alert("Invalid password length.");
      }
    },
    askRequirements: function () {
      this.lowercase = confirm("Require lower case characters? \n(OK for Yes, Cancel for No.)");
      this.uppercase = confirm("Require upper case characters? \n(OK for Yes, Cancel for No.)");
      this.numbers = confirm("Require numbers? \n(OK for Yes, Cancel for No.)");
      this.specialChar = confirm("Require special characters? \n(OK for Yes, Cancel for No.)");
    }
  }

  //Password Generator object
  var getCharacters = {
    specialChars: ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", "-", ".", "/", ":", ";", "<", "=", ">",
      "?", "@", "[", "]", "^", "_", "{", "|", "}", "~"],
    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    randomChar: [],
    generatedPassword: "",
    getLowerCase: function () {
      var newLowerCase = this.alphabet[Math.floor(Math.random() * this.alphabet.length)].toLowerCase();
      this.generatedPassword = this.generatedPassword + newLowerCase;
    },
    getUpperCase: function () {
      var newUpperCase = this.alphabet[Math.floor(Math.random() * this.alphabet.length)].toUpperCase();
      this.generatedPassword = this.generatedPassword + newUpperCase;
    },
    getRandomInt: function () {
      min = Math.ceil(0);
      max = Math.floor(9);
      var newNumber = Math.floor(Math.random() * (9 - 0 + 1)) + min;
      this.generatedPassword = this.generatedPassword + newNumber.toString();
    },
    getSpecialChars: function () {
      var newSpecialChar = this.specialChars[Math.floor(Math.random() * this.specialChars.length)];
      this.generatedPassword = this.generatedPassword + newSpecialChar;
    }
  }

  //Begin Main function//
  
  //Ask password length
  requirements.askPasswordLength();
  while (requirements.passwordLength < requirements.minPasswordLength ||
    requirements.passwordLength > requirements.maxPasswordLength
  ) {
    alert("Choose from " + requirements.minPasswordLength + " to " + requirements.maxPasswordLength + " characters.");
    requirements.askPasswordLength();
  }
  //Ask required character types
  requirements.askRequirements();
  while (requirements.lowercase == false &&
    requirements.uppercase == false &&
    requirements.numbers == false &&
    requirements.specialChar == false
  ) {
    alert("At least one character type must be selected!");
    requirements.askRequirements();
  }

  //Generate minimum required characters
  if (requirements.lowercase == true) {
    getCharacters.getLowerCase();
    getCharacters.randomChar.push("getLowerCase()"); //Add required character as an option in the randomChar array
  }
  if (requirements.uppercase == true) {
    getCharacters.getUpperCase();
    getCharacters.randomChar.push("getUpperCase()"); //Add required character as an option in the randomChar array
  }
  if (requirements.numbers == true) {
    getCharacters.getRandomInt();
    getCharacters.randomChar.push("getRandomInt()"); //Add required character as an option in the randomChar array
  }
  if (requirements.specialChar == true) {
    getCharacters.getSpecialChars();
    getCharacters.randomChar.push("getSpecialChars()"); //Add required character as an option in the randomChar array
  }
  console.log(getCharacters.generatedPassword);
  //console.log("Remaining chars to fill in: " + (requirements.passwordLength - getCharacters.generatedPassword.length));

  //Fill in the rest of the password
  for (var p = getCharacters.generatedPassword.length;
    p < requirements.passwordLength;
    p++) {
    var randomChar = getCharacters.randomChar[Math.floor(Math.random() * getCharacters.randomChar.length)];
    if (randomChar == "getLowerCase()") {
      getCharacters.getLowerCase();
    } else if (randomChar == "getUpperCase()") {
      getCharacters.getUpperCase();
    } else if (randomChar == "getRandomInt()") {
      getCharacters.getRandomInt();
    } else getCharacters.getSpecialChars();
  }
  //Initial Generated Password
  console.log(getCharacters.generatedPassword);

  //Generated Password must be shuffled to randomise value
  function scramble(a) { 
    a = a.split(""); 
    for (var b = a.length - 1; 0 < b; b--) {
      var c = Math.floor(Math.random() * (b + 1)); d = a[b]; a[b] = a[c]; a[c] = d 
    } 
    return a.join("") }

  //Final Password
  return (scramble(getCharacters.generatedPassword));
}
