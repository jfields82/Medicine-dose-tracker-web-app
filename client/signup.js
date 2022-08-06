const form = document.querySelector(".form");
const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const DOBInput = document.querySelector("#dob");
const addressInput = document.querySelector("#address");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("form submitted");
  const username = usernameInput.value;
  const password = passwordInput.value;
  const DOB = DOBInput.value;
  const address = addressInput.value;

  console.log(username, password);

  const user = await axios.post("http://localhost:5000/api/v1/auth/signup", {
    username: username,
    password: password,
    DOB: DOB,
    address: address,
  });
  localStorage.setItem("token", user.data.token);
  localStorage.setItem("username", user.data.user.username);
  localStorage.setItem("user Id", user.data.user._id);
  console.log(user.data);
  location.href = "user.html";
});


// TOGGLE NAV BAR
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show-nav");
});