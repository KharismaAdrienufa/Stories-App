class StoryItem extends HTMLElement{
    _story = {
        id: null,
        name: null,
        description: null,
        photoUrl: null,
        createdAt: null,
    }

    constructor() {
        super();
    }

    set story(value) {
        this._story = value;

        this.render();
    }

    async connectedCallback() {
        this.render();
        await this.afterRender();
    }

    render() {
        this.innerHTML = '';
        
        this.innerHTML = `
            <style>
                .story-item {
                    box-shadow: 0 2px 4px 0 #bcbfc4;
                    border-radius: 15px;
                    overflow: hidden;
                }

                img {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }

                .story-content {
                    padding: 10px;
                }
            </style>

            <div id="storyItem" class="story-item" story-id="${this._story.id}">
                <img src="${this._story.photoUrl}" alt="photo by ${this._story.name}">
                <div class="story-content">
                    <b>Author ${this._story.name}</b>
                    <p>Created at ${this._story.createdAt}</p>
                    <p>${this._story.description}</p>
                </div>
            </div>
        `
    }

    async afterRender() {
        const storyItem = this.querySelector("#storyItem");

        storyItem.addEventListener('click', () => {
            const storyId = storyItem.getAttribute("story-id");

            window.location.hash = `#/stories/${storyId}`;
        })
    }
}

customElements.define("story-item", StoryItem);