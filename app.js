const form = document.querySelector(".form");
const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const errorMsg = document.querySelector(".error");
const btnCon = document.querySelector(".btn-container");
const token = localStorage.getItem('token')
if (token) {
  btnCon.style.display = "none";
}

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   console.log("form submitted");
//   const username = usernameInput.value;
//   const password = passwordInput.value;

//   console.log(username, password);

//   try {
//     const user = await axios.post("http://localhost:5000/api/v1/auth/login", {
//       username: username,
//       password: password,
//     });

//     localStorage.setItem("token", user.data.token);
//     localStorage.setItem("username", user.data.user.username);
//     localStorage.setItem("user Id", user.data.user.userId);

//     location.href = "user.html";
//   } catch (error) {
//     console.log(error.response.data.error);
//     const err = error.response.data.error;
//     // errorMsg.textContent = err;
//     alert(err);
//   }
// });

// TOGGLE NAV BAR
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show-nav");
});
