import StoryApi from "../data/api";
import StoryItem from "./story-item";

class StoryList extends HTMLElement{
    constructor() {
        super();
    }

    async connectedCallback() {
        this.render();
        await this.afterRender();
    }

    render() {
        this.innerHTML += '';

        this.innerHTML = `
            <style>
                .story-list {
                    display: grid;
                    grid-template-columns: repeat(3, 350px);
                    justify-content: center;
                    gap: 25px;
                }
            </style>

            <div id="storyList" class="story-list"></div>
        `;
    }

    async afterRender() {
        const storyList = this.querySelector("#storyList");
        storyList.innerHTML = '';
        
        const responseData = await StoryApi.getAllStories();
        const stories = responseData.listStory;
        
        if(!stories || stories.length == 0) {
            storyList.innerHTML = `<p>Nothing</p>`;
            return;
        }

        const storyItems = stories.map((story) => {
            const storyItem = document.createElement("story-item");
            storyItem.story = story;

            return storyItem
        });

        storyList.append(...storyItems);
    }
}

customElements.define("story-list", StoryList);