import StoryApi from "../../data/api";

class HomePage {
  async render() {
    return `
      <section class="container">
        <h1>Home Page</h1>
        <div id="storyList">
        </div>
      </section>
    `;
  }

  async afterRender() {
    const storyList = document.getElementById("storyList");
    storyList.innerHTML = '';

    const responseData = await StoryApi.getAllStories();
    const stories = responseData.listStory;

    if(stories.length == 0) {
      storyList.innerHTML = `<p>Nothing</p>`;
      return;
    }

    const renderStoryItem = (story) => {
      return `
        <div story-id="${story.id}">
          <img src="${story.photoUrl}">
          <b>${story.createdAt}</b>
          <p>${story.description}</p>
        </div>
      `
    }

    stories.forEach(story => {
      storyList.insertAdjacentHTML("beforeend", renderStoryItem(story));
    })
  }
}

export default HomePage;
