import CONFIG from '../config';

class StoryApi {
  static async login(email, password) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    }

    const fetchResponse = await fetch(`${CONFIG.BASE_URL}/login`, options);
    if (!(fetchResponse.status >= 200 && fetchResponse.status < 300)) {
       throw new Error("something went wrong");
    }

    console.log("login success");

    return await fetchResponse.json();
  }

  static async register(name, email, password) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    }

    const fetchResponse = await fetch(`${CONFIG.BASE_URL}/register`, options);
    if (!(fetchResponse.status >= 200 && fetchResponse.status < 300)) {
       throw new Error("something went wrong");
    }

    console.log("register success");

    return await fetchResponse.json();;
  }

  static async addStory(desc, photo) {
    const authToken = localStorage.getItem("AUTH-TOKEN");

    const formData = new FormData();
    formData.append("description", desc);
    formData.append("photo", photo);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${authToken}`
      },
      body: formData
    }

    const fetchResponse = await fetch(`${CONFIG.BASE_URL}/stories`, options);
    if (!(fetchResponse.status >= 200 && fetchResponse.status < 300)) {
       throw new Error("something went wrong");
    }
  }

  static async getAllStories() {
    const authToken = localStorage.getItem("AUTH-TOKEN");

    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    }

    const fetchResponse = await fetch(`${CONFIG.BASE_URL}/stories`, options);

    if (!(fetchResponse.status >= 200 && fetchResponse.status < 300)) {
      throw new Error("something went wrong");
    }

    return await fetchResponse.json();
  }
}

export default StoryApi;