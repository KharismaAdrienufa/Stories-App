import StoryApi from "../../data/api";

class AddStory {
    constructor() {
        this._addMymap = null;
    }

    render() {
        return `
        <style>
            .form-group {
                display: flex;
                flex-direction: column;
            }

            .map {
                width: 100%;
                height: 300px;
                background-color: gray;
            }
        </style>

        <section class="form-container">
            <div class="add-story card">
                <h1>Add Story</h1>
                <form id="addStoryForm" class="add-story-form">
                    <label for="addPhoto">Add Photo</label>
                    <input type="file" id="addPhoto" accept="image/*" aria-required="true" required>
                    <label for="addDesc">Add Description</label>
                    <textarea id="addDesc" aria-required="true" required></textarea>
                    <div class="form-group">
                        <div id="addStoryMap" class="map" role="input"></div>
                        <label for="latMap">Latitude</label>
                        <input id="latMap" type="text" readonly>
                        <label for="lonMap">Longitude</label>
                        <input id="lonMap" type="text" readonly>
                    </div>
                    <button type="submit" id="addStoryButton">Add Story</button>
                </form>
            </div>
        </section>
        `
    }

    async afterRender() {
            const addStoryForm = document.getElementById("addStoryForm");
            const addStoryMyMap = document.getElementById("addStoryMap");
            let latMap = document.getElementById("latMap");
            let lonMap = document.getElementById("lonMap");
            const indonesiaCoor = [-2.548926, 118.0148634];

            if(!addStoryMyMap) return;

            if(this._addMymap) {
                this._addMymap.remove();
                this._addMyMap = null;
            }

            const myMap = L.map('addStoryMap', {
            zoom: 5,
            center: indonesiaCoor,
            });

            const rasterTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
            const baseTile = L.tileLayer(rasterTileUrl, {
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
            });
            baseTile.addTo(myMap);

            let selectedCoor = null;
            myMap.on('click', (e) => {
                const {lat, lng} = e.latlng;

                if(selectedCoor) {
                    myMap.removeLayer(selectedCoor);
                }

                selectedCoor = L.marker([lat, lng])
                    .addTo(myMap)
                    .bindPopup(`Selected : ${lat}, ${lng}`)
                    .openPopup();

                latMap.value = lat;
                lonMap.value = lng;
            });

        const addStoryFormSubmit = async (event) => {
            event.preventDefault();
            const addPhoto = document.getElementById("addPhoto");
            const addDesc = document.getElementById("addDesc").value;
            const maxSize = 1024 * 1024 // 1MB
            const photoFile = addPhoto.files[0];

            if(!photoFile) return;

            if(photoFile.size > maxSize ) {
                alert("File max 1MB");
                return;
            }

            if(!this._selectedLat && !this._selectedLon) {
                alert("Select Location");
                return;
            }

            const fetchResponse = await StoryApi.addStory(addDesc, photoFile, this._selectedLat, this._selectedLon);
            if(!fetchResponse?.error) {
                alert("Adding Story");

                window.location.hash = '#/';
            } else {
                alert("Fail to Add Story");
            }
        }

        addStoryForm.addEventListener('submit', addStoryFormSubmit);
    }
}

export default AddStory;