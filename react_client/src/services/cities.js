const serverIp = "http://localhost:3001";

export async function getCities() {
  let cities;
  cities = await fetch(serverIp + "/cities")
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  return cities;
}

export async function getGuides(idCity) {
  let guides;
  guides = fetch(serverIp + `/cities/guides/${idCity}`) //ip adress serwera
    .then(res => res.json())
    .then(foundGuidesInSearchedCity => {
        return foundGuidesInSearchedCity
      }
    )
    .catch(error => {
      console.error(error);
    });
  return guides;
}