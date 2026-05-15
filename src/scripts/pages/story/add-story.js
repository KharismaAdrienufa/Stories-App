import StoryApi from "../../data/api";

class AddStory {
    render() {
        return `
        <form id="addStoryForm">
            <label for="addPhoto">Add Photo</label>
            <input type="file" id="addPhoto" accept="image/*" required>
            <label for="addDesc">Add Description</label>
            <textarea id="addDesc" required></textarea>
            <button type="submit" id="addStoryButton">Add Story</button>
        </form>
        `
    }

    async afterRender() {
        const addStoryFormSubmit = async (event) => {
            event.preventDefault();
            const addPhoto = document.getElementById("addPhoto");
            const addDesc = document.getElementById("addDesc").value;

            if(!addPhoto) return;
            const maxSize = 1024 * 1024 // 1MB
            
            if(addPhoto.size > maxSize) {
                const fetchResponse = await StoryApi.addStory(addDesc, addPhoto);
                if(!fetchResponse.error) {
                    alert("Adding Story");
    
                    window.location.hash = '#/';
                } else {
                    alert("Fail to Add Story");
                }
            } else {
                alert("File max 1MB");
            }
        }

        addStoryForm.addEventListener('submit', addStoryFormSubmit);
    }
}

export default AddStory;