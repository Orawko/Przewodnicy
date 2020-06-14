const serverIp = "http://localhost:3001";

export async function setNewPassword(newPassword, newPasswordRepeat, isGuide, userID) {
  console.log(newPassword);
  if (!newPassword) {
    return false;
  } else if (newPassword === newPasswordRepeat && !isGuide) {
    fetch(
      serverIp + `/users/updatePassword/${userID}/${newPassword}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    alert("New password set.");
    return true;
  } else if (newPassword === newPasswordRepeat && isGuide) {
    fetch(
      serverIp + `/guides/updatePassword/${userID}/${newPassword}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    alert("New password set.");
    return true;
  } else {
    alert("Passwords are different!");
    return false;
  }
}

export async function setNewPhoneNumber(newPhoneNumber, isGuide, id) {
  if (typeof newPhoneNumber == "undefined") {
    return false;
  } else if (!isGuide) {
    fetch(
      serverIp + `/users/updatePhone/${id}/${newPhoneNumber}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    alert("New phone number set");
  } else {
    fetch(
      serverIp + `/guides/updatePhone/${id}/${newPhoneNumber}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    alert("New phone number set.");
    return true;
  }
}

export async function setNewDescription(newDescription, idGuide) {
  if (newDescription === "") {
    return false;
  } else {
    fetch(
      serverIp +
      `/guides/updateDescription/${idGuide}/${newDescription}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    alert("New description set.");
  }
}

export async function deleteCity(cityName, id) {
  if (typeof cityName == "undefined") {
    return false;
  } else {
    fetch(
      serverIp +
      `/guides/guidesInCity/${id}/${cityName}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    ).then(res => {
      if (res.status >= 200 && res.status < 300) {
        alert("City Deleted");
      } else {
        alert("You are not a guide in this city")
      }
    })
      .catch(err => {
        console.log(err);
      });
  }
}

export async function addCity(cityName, id) {
  if (typeof cityName == "undefined") {
    return false;
  } else {
    fetch(
      serverIp +
      `/guides/guidesInCity/${id}/${cityName}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    ).then(res => {
      if (res.status >= 200 && res.status < 300) {
        alert("City added!.");
      } else {
        alert("That city do not exists!")
      }
    })
      .catch(err => {
        console.log(err);
      });
  }
}