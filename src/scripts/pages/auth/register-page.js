import StoryApi from '../../data/api';

class RegisterPage {
  render() {
    return `
    <section class="form-container">
      <div class="card">
        <h1>Register</h1>
        <form id="regForm" class="reg-form">
            <label for="regName">Name</label>
            <input id="regName" required>
            <label for="regEmail">Email</label>
            <input type="email" id="regEmail" required>
            <label for="regPassword">Password</label>
            <input type="password" id="regPassword" minlength="8" required>
            <button type="submit" id="regButton">Register</button>
        </form>
        <p>Already have account? <a href="#/login">Login</a>here</p>
      </div>
    </section>
    `;
  }

  async afterRender() {
    const regForm = document.getElementById("regForm");
      
    const regFormSubmit = async (event) => {
        event.preventDefault();
        const regName = document.getElementById("regName").value;
        const regEmail = document.getElementById("regEmail").value;
        const regPassword = document.getElementById("regPassword").value;

        if(!regName || !regEmail || !regPassword) return;
        
        const fetchResponse = await StoryApi.register(regName, regEmail, regPassword);
        
        if (!fetchResponse.error) {
            alert("Register Success");

            window.location.hash = '#/';
        } else {
            alert("Register Failed");
        }
    }

    regForm.addEventListener('submit', regFormSubmit);
  }
}

export default RegisterPage;