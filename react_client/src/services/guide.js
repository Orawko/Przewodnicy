const serverIp = "http://localhost:3001";

export async function getGuideInfo(id) {
  let guide;
  guide = await fetch(serverIp + "/guides/" + id)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  return guide;
}

export async function getDates(id) {
  let r;
  r = await fetch(serverIp + `/guides/dates/${id}`)
    .then(res => res.json())
    .then(foundGuideDates => {
        return foundGuideDates;
      }
    )
    .catch(error => {
      console.error(error);
    });
  return r;
}

export async function getOpinions(id) {
  let r;
  r = await fetch(serverIp + `/guides/opinions/${id}`)
    .then(res => res.json())
    .then(foundGuideOpinions => {
      return foundGuideOpinions;
    })
    .catch(error => {
      console.error(error);
    })
  return r;
}

export async function sendOpinion(idGuide, content, idUser) {
  fetch(
    serverIp + `/users/opinions/${idGuide}/${content}/${idUser}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: `guide`
      })
    }
  ).catch(error => {
    console.error(error);
  });
}
