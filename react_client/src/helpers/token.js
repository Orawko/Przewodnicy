import decode from "jwt-decode";

export async function storeData(token) {
  try {
    await localStorage.setItem("token", token);
  } catch (error) {
  }
}

export function retrieveData() {
  try {
    const value = localStorage.getItem("token");
    if (value !== null) {
      const res = decode(value);
      return {data: JSON.parse(res.data), isGuide: res.isGuide};
    }
  } catch (error) {
  }
}