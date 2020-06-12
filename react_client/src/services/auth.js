import {storeData} from "../helpers/token";

export async function authenticate(email, password) {
  console.log("logowanie...")
  let details = {
    email: `${email}`,
    password: `${password}`
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const res = await fetch("http://localhost:3001/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: formBody
  })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        console.log(res);
        res.json().then(data => {
          storeData(data.token);
          alert("Login Successful!")
        });
        return true;
      } else {
        alert("Invalid email or password!");
        return false;
      }
    })
    .catch(err => {
      console.log("Unexpected error occurred!");
      console.log(err);
      return false;
    });
  return res;
}