// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

//  Function to validate password length. This function checks the following:
//  - User press CANCEL
//  - Entered password length is not a number.
//  - if the user entry is valid number then check for password length less than 8 or greater than 128.

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

// Function to generate password
function generatePassword() {
  var password = "Your Secure Password not generated";

  // get the user inputs
  var passwordLengthUserInput = prompt(
    "How many characters would you like your password to contain?"
  );
  console.log("Password length: " + passwordLengthUserInput);

  // Validate password length user input
  var passwordValid = validatePasswordLength(passwordLengthUserInput);

  var passwordLength;

  if (passwordValid) {
    passwordLength = parseInt(passwordLengthUserInput);

    var includeSpecialChars = confirm(
      "Click OK to confirm including special characters."
    );
    console.log("Special Chars inclusion: " + includeSpecialChars);

    var includeNumericChars = confirm(
      "Click OK to confirm including numeric characters."
    );
    console.log("Numeric Chars inclusion: " + includeNumericChars);

    var includeLowercaseChars = confirm(
      "Click OK to confirm including lowercase characters."
    );
    console.log("Lowercase characters inclusion: " + includeLowercaseChars);

    var includeUppercaseChars = confirm(
      "Click OK to confirm including uppercase characters."
    );
    console.log("Uppercase characters inclusion: " + includeUppercaseChars);

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

  ////////==============Logic=================================//////////////

  if (passwordValid) {
    var keyStrings = {
      lowerCase: "abcdefghijklmnopqrstuvwxyz",
      upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      specialChars: "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\",
    };

    var searchString = "";

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

    // Generate four random numbers
    var randomPasswordIndex = [];
    for (var i = 1; i <= 4; i++) {
      var index = Math.floor(Math.random() * password.length)
      var matchFound = true;
      while (matchFound) {
        matchFound = false;
        for (var j = 0; j < randomPasswordIndex.length; j++) {
          if (randomPasswordIndex[j] === index) {
            matchFound = true;
            break;
          }
        }
        if(matchFound)
           index = Math.floor(Math.random() * password.length);
        
      }
      if (!matchFound)
        randomPasswordIndex.push(index);
    }

    console.log("Befor last manipulation: " + password);
    // use the random indices to make sure each character set is included
    if (includeLowercaseChars) 
    {
      searchString = keyStrings.lowerCase;
      var tempindex = randomPasswordIndex[0];
      var tempchar =  searchString[Math.floor(Math.random() * searchString.length)];
      password = password.substr(0, tempindex) + tempchar + password.substr(tempindex +1);
    }
    if (includeUppercaseChars)
    {
      searchString = keyStrings.upperCase;
      var tempindex = randomPasswordIndex[1];
      var tempchar =  searchString[Math.floor(Math.random() * searchString.length)];
      password = password.substr(0, tempindex) + tempchar + password.substr(tempindex +1);
    } 
    if (includeNumericChars) 
    {
      searchString = keyStrings.numbers;
      var tempindex = randomPasswordIndex[2];
      var tempchar =  searchString[Math.floor(Math.random() * searchString.length)];
      password = password.substr(0, tempindex) + tempchar + password.substr(tempindex +1);
      
    }
    if (includeSpecialChars)
    { 
      searchString = keyStrings.specialChars;
      var tempindex = randomPasswordIndex[3];
      var tempchar =  searchString[Math.floor(Math.random() * searchString.length)];
      password = password.substr(0, tempindex) + tempchar + password.substr(tempindex +1);
    }


  }
  console.log(password);
  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
