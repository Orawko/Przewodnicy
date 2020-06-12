const serverIp = "http://localhost:3001";

export async function getDates(idGuide) {
  return await fetch(`http://localhost:3001/guides/dates/${idGuide}`)
    .then(res => res.json())
    .then(foundGuideDates => {
      return foundGuideDates;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}

export async function sendNewDate(idGuide, datetime, len) {
  fetch(
    serverIp + `/guides/dates/${idGuide}/${datetime}/${len}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: `opinion`
      })
    }
  ).catch(error => {
    console.error(error);
  });
}

export async function deleteDate(idGuide, datetime) {
  fetch(
    serverIp + `/guides/dates/${idGuide}/${datetime}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  ).catch(error => {
    console.error(error);
  });
}