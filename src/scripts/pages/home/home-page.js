import StoryApi from "../../data/api";
import StoryList from "../../components/story-list";
import * as L from "leaflet";

class HomePage {
  async render() {
    return `
      <style>
        .home-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .home-map-container {
          margin: 0 auto;
          width: 1000px;
        }
      </style>

      <section class="home-container">
        <h1>Stories</h1>
        <section class="home-map-container">
          <div id="homeMap" class="map" style="height:350px;"></div>
        </section>
        <section class="home-storylist-container">
          <story-list></story-list>
        </section>
      </section>
    `;
  }

  async afterRender() {
    const fetchResponse = await StoryApi.getAllStories();
    const stories = fetchResponse.listStory;

    if(!stories || stories.length === 0) return;

    setTimeout(() => {
      const mapContainer = document.querySelector(".home-map-container");
      mapContainer.innerHTML = '<div id="homeMap" style="height:350px;"></div>';
  
      const homeMap = document.getElementById("homeMap");
      if(!homeMap) return;
  
      const myMap = L.map(homeMap, {
        zoom: 5,
        center: [-2.548926, 118.0148634],
      });
  
      const rasterTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      L.tileLayer(rasterTileUrl, {
          attribution: '&copy; <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a> OpenStreetMap contributors',
      }).addTo(myMap);
  
      stories.forEach(story => {
        if(story.lat && story.lon) {
          const marker = L.marker([story.lat, story.lon]).addTo(myMap);
          marker.bindPopup(`Author: ${story.name}`);
        }
      })

    })
  }
}

export default HomePage;
