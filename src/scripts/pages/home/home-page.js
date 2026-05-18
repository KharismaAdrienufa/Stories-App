import StoryList from "../../components/story-list";

class HomePage {
  async render() {
    return `
      <section class="home-container">
        <h1>Stories</h1>
        <story-list></story-list>
      </section>
    `;
  }

  async afterRender() {
  }
}

export default HomePage;
