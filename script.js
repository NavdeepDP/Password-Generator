// Assignment Code
var generateBtn = document.querySelector("#generate");

/**
 * VARIABLE DECLARATIONS
 */
var passwordValid = false;
var passwordLength = 0;
var includeSpecialChars = false;
var includeNumericChars = false;
var includeLowercaseChars = false;
var includeUppercaseChars = false;

/**
 * FUNCTION DEFINITIONS
 */

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

/**  Function to validate password length. This function checks the following:
 *  - User press CANCEL
 *  - Entered password length is not a number.
 *  - if the user entry is valid number then check for password length less than 8 or greater than 128.
 */
function validatePasswordLength(passwordLengthUserInput) {
  var passwordValid = true;
  // Password Maximum and Minimum length
  var passwordMaxLength = 128;
  var passwordMinLength = 8;

  if (passwordLengthUserInput === null) passwordValid = false;

  //passwordLength validation
  var passwordLength = parseInt(passwordLengthUserInput);
  if (passwordValid && isNaN(passwordLength)) {
    passwordValid = false;
    alert("Password length must be a number.");
  }

  if (passwordValid) {
    // password length validation
    if (passwordLength > passwordMaxLength) {
      alert("Password length must less than 129 characters.");
      passwordValid = false;
    } else if (passwordLength < passwordMinLength) {
      alert("Password length must be at least 8 characters long");
      passwordValid = false;
    }
  }
  return passwordValid;
}

/**
 * Function to get the inputs from user and calls the function to validate user input.
 */
function getUserInputs() {
  // get the user input - Password length
  var passwordLengthUserInput = prompt(
    "How many characters would you like your password to contain?"
  );
  //console.log("Password length: " + passwordLengthUserInput);

  // Validate password length user input
  passwordValid = validatePasswordLength(passwordLengthUserInput);

  if (passwordValid) {
    passwordLength = parseInt(passwordLengthUserInput);

    // User Input - to include special characters
    includeSpecialChars = confirm(
      "Click OK to confirm including special characters."
    );
   // console.log("Special Chars inclusion: " + includeSpecialChars);

    // User Input - to include numeric characters
    includeNumericChars = confirm(
      "Click OK to confirm including numeric characters."
    );
   // console.log("Numeric Chars inclusion: " + includeNumericChars);

    // User Input - to include lower characters
    includeLowercaseChars = confirm(
      "Click OK to confirm including lowercase characters."
    );
   // console.log("Lowercase characters inclusion: " + includeLowercaseChars);

    // User Input - to include uppercase characters
    includeUppercaseChars = confirm(
      "Click OK to confirm including uppercase characters."
    );
   // console.log("Uppercase characters inclusion: " + includeUppercaseChars);

    if (
      !includeSpecialChars &&
      !includeNumericChars &&
      !includeLowercaseChars &&
      !includeUppercaseChars
    ) {
      alert("At least one character type should be selected.");
      passwordValid = false;
    }
  }
}

/**
 * This function gets the user input, call the function to validate user input and
 *  and generate password based on user selections.
 */

// Function to generate password
function generatePassword() {
  var password = "Your Secure Password not generated";

  // get user input to set the criteria to generate password.
  getUserInputs();

  ////////============== Password Generation Logic=================================//////////////

  // Password generation logic will run only if the the user input meets all the minimum 
  //criteria to generate password

  if (passwordValid) {
    var keyStrings = {
      lowerCase: "abcdefghijklmnopqrstuvwxyz",
      upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      specialChars: "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\",
    };

    var searchString = ""; 

    // generate the string which contains all the character types selected by user
    if (includeLowercaseChars) searchString += keyStrings.lowerCase;
    if (includeUppercaseChars) searchString += keyStrings.upperCase;
    if (includeNumericChars) searchString += keyStrings.numbers;
    if (includeSpecialChars) searchString += keyStrings.specialChars;


    if (searchString.length > 0) {
      password = "";

      for (var i = 1; i <= passwordLength; i++) {
        password +=
          searchString[Math.floor(Math.random() * searchString.length)];
      }
    }

    // The below logic is to make sure that at least one character is present from all the
    // types (lowercase, uppercase, numbers and/or special chars)
    // selected by user.


    // Generate four random numbers
    var randomPasswordIndex = [];
    for (var i = 1; i <= 4; i++) {
      var index = Math.floor(Math.random() * password.length);
      var matchFound = true;
      while (matchFound) {
        matchFound = false;
        for (var j = 0; j < randomPasswordIndex.length; j++) {
          if (randomPasswordIndex[j] === index) {
            matchFound = true;
            break;
          }
        }
        if (matchFound) index = Math.floor(Math.random() * password.length);
      }
      if (!matchFound) randomPasswordIndex.push(index);
    }

    //console.log("Before last manipulation: " + password);

    // use the random indices to make sure each character set is included
    if (includeLowercaseChars) {
      searchString = keyStrings.lowerCase;
      var randomIndex = randomPasswordIndex[0];
      var randomChar =
        searchString[Math.floor(Math.random() * searchString.length)];
      password =
        password.substr(0, randomIndex) +
        randomChar +
        password.substr(randomIndex + 1);
    }
    if (includeUppercaseChars) {
      searchString = keyStrings.upperCase;
      var randomIndex = randomPasswordIndex[1];
      var randomChar =
        searchString[Math.floor(Math.random() * searchString.length)];
      password =
        password.substr(0, randomIndex) +
        randomChar +
        password.substr(randomIndex + 1);
    }
    if (includeNumericChars) {
      searchString = keyStrings.numbers;
      var randomIndex = randomPasswordIndex[2];
      var randomChar =
        searchString[Math.floor(Math.random() * searchString.length)];
      password =
        password.substr(0, randomIndex) +
        randomChar +
        password.substr(randomIndex + 1);
    }
    if (includeSpecialChars) {
      searchString = keyStrings.specialChars;
      var randomIndex = randomPasswordIndex[3];
      var randomChar =
        searchString[Math.floor(Math.random() * searchString.length)];
      password =
        password.substr(0, randomIndex) +
        randomChar +
        password.substr(randomIndex + 1);
    }
  }
  //console.log(password);
  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
