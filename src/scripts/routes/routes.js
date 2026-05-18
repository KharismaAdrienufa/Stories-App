import HomePage from '../pages/home/home-page';
import LoginPage from '../pages/auth/login-page';
import RegisterPage from '../pages/auth/register-page';
import AddStory from '../pages/story/add-story';
import DetailStory from '../pages/story/detail-story';

const routes = {
  '/': new HomePage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/add-story': new AddStory(),

  get '/stories/:id'() {
    return new DetailStory();
  }
};

export default routes;
