import { parseActivePathname } from "../routes/url-parser";
import StoryApi from "../data/api";
import * as L from "leaflet";

class StoryDetail extends HTMLElement{
    _story = null;
    _detailMap = null;

    constructor() {
        super();

        const urlDetail = parseActivePathname();
        this.storyId = urlDetail.id;
    }

    async connectedCallback() {
        await this.fetchDetail(this.storyId);
        this.innerHTML = this.render();

        this.initMap();
    }

    async fetchDetail(storyId) {
        const fetchResponse = await StoryApi.getDetailStory(storyId);
        this._story = fetchResponse.story;
    }

    render() {
        return `
            <style>
                .detail-story {
                    display: grid;
                    grid-template-columns: repeat(2, 500px);
                    grid-template-rows: 450px 250px;
                    grid-template-areas:
                        "detail-img detail-img"
                        "detail-content detail-map";
                    justify-content: center;
                    gap: 30px;
                }

                .detail-img {
                    grid-area: detail-img;
                    border-radius: 25px;
                    overflow: hidden;
                }
                    
                .detail-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }

                .detail-content {
                    grid-area: detail-content;
                }

                .detail-map {
                    grid-area: detail-map;
                    border-radius: 10px;
                    height: 250px;
                    overflow: hidden;
                }

                .map {
                    width: 100%;
                    height: 100%;
                    min-heigth: 250px;
                    background-color: gray;
                }
            </style>

            <section id="detailStory" class="detail-story" story-id="${this._story.id}">
                <div class="detail-img">
                    <img src="${this._story.photoUrl}" alt="photo by ${this._story.name}">
                </div>
                <div class="detail-content">
                    <h2>Author ${this._story.name}</h2>
                    <h3>Created at ${this._story.createdAt}</h3>
                    <p>${this._story.description}</p>
                </div>
                <div class="detail-map">
                    <div id="storyDetailMap" class="map"></div>
                </div>
            </section>
        `
    }

    initMap() {
        const storyDetailMyMap = document.getElementById("storyDetailMap");
        const indonesiaCoor = [-2.548926, 118.0148634];
        const lat = this._story.lat || indonesiaCoor[0];
        const lon = this._story.lon || indonesiaCoor[1];
        const coor = [lat, lon];

        if(!storyDetailMyMap) return;

        if(this._detailMap) {
            this._detailMap.remove();
            this._detailMap = null;
        }

        const myMap = L.map('storyDetailMap', {
        zoom: 10,
        center: coor,
        });

        const rasterTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
        const baseTile = L.tileLayer(rasterTileUrl, {
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
        });
        baseTile.addTo(myMap);

        if(this._story.lat && this._story.lon) {
            L.marker(coor).addTo(myMap)
                .bindPopup(`Author ${this._story.name}`).openPopup();
        }
    }
}

customElements.define("story-detail", StoryDetail);