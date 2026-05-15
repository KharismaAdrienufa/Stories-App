import StoryApi from '../../data/api';

class LoginPage {
  render() {
    return `
    <form id="loginForm">
        <label for="loginEmail">Email</label>
        <input type="email" id="loginEmail" required>
        <label for="loginPassword">Password</label>
        <input type="password" id="loginPassword" required>
        <button type="submit" id="loginButton">Login</button>
    </form>
    `;
  }

  async afterRender() {
    const checkStorage = () => {
        try {
            const testKey = "STORAGE_TEST_KEY";
            localStorage.setItem(testKey, "Testing Storage");
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    const loginForm = document.getElementById("loginForm");
      
    const loginFormSubmit = async (event) => {
        event.preventDefault();
        let tokenCache = null;
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;

        if(!loginEmail || !loginPassword) return;
        
        const fetchResponse = await StoryApi.login(loginEmail, loginPassword);
        
        if(!fetchResponse.error) {
            alert("Login Success");
            if(checkStorage()) {
              localStorage.setItem("AUTH-TOKEN", fetchResponse.loginResult.token);
            } else {
              tokenCache = fetchResponse.loginResult.token;
            }

            window.location.hash = '#/';
        } else {
            alert("Login Failed");
        }
    }

    loginForm.addEventListener('submit', loginFormSubmit);
  }
}

export default LoginPage;