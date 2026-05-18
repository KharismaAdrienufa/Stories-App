import StoryApi from "../../data/api";

class AddStory {
    constructor() {
        this._selectedLat = null;
        this._selectedLon = null;
    }

    render() {
        return `
        <style>
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
                    <input type="file" id="addPhoto" accept="image/*" required>
                    <label for="addDesc">Add Description</label>
                    <textarea id="addDesc" required></textarea>
                    <div id="map" class="map" role="input"></div>
                    <button type="submit" id="addStoryButton">Add Story</button>
                </form>
            </div>
        </section>
        `
    }

    async afterRender() {
            const addStoryForm = document.getElementById("addStoryForm");
            const indonesiaCoor = [-2.548926, 118.0148634];

            const myMap = L.map('map', {
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
                    .bindPopup("Selected Location")
                    .openPopup();

                this._selectedLat = lat;
                this._selectedLon = lng;
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