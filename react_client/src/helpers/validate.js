function validateName(name) {
  if (name && name.length >= 3) return true;
  else {
    alert("Name should have at least 3 characters!")
    return false;
  }
}

function validateSurname(surname) {
  if (surname && surname.length >= 3) return true;
  else {
    alert("Surname should have at least 3 characters!")
    return false;
  }
}

function validateEmail(email) {
  if (/\S+@\S+\.\S+/.test(email)) return true;
  else {
    alert("Email is incorrect!");
    return false;
  }
}

function validatePassword(password, passwordRepeat) {
  if (password && password === passwordRepeat && password.length > 4) return true;
  else {
    alert("Given passwords are different or too short!")
    return false;
  }
}

function validatePhone(phone) {
  if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone)) return true;
  else {
    alert("Phone number is incorrect!")
    return false;
  }
}

function validateAge(age) {
  if (age && age >= 0 && age <= 140) return true
  else {
    alert("Given age is incorrect!");
    return false;
  }
}

module.exports = {validateEmail, validateName, validatePassword, validatePhone, validateSurname, validateAge};