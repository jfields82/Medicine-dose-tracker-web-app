const username = localStorage.getItem("username");
const token = localStorage.getItem("token");
const name = document.querySelector(".name");

name.textContent = `Welcome ${username}`;

const medicineForm = document.querySelector(".medicine-form");
const medicineName = document.querySelector(".medicine-name");
const dosage = document.querySelector(".dosage");
const frequency = document.querySelector(".frequency");
const medContainer = document.querySelector(".user-med");

// const createMed = ()=>{

// }
window.addEventListener("load", () => {
  getUserMed();
});
// Events actions will use the user or browser manipulates a page to show the values of medicineName, dodosage frequency.
medicineForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const medicine = await axios.post(
      "http://localhost:5000/api/v1/medicine/create",
      {
        medicineName: medicineName.value,
        dosage: dosage.value,
        frequency: frequency.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(medicine);
    getUserMed();
    medicineName.value = "";
    dosage.value = "";
    frequency.value = "";
  } catch (error) {
    console.log(error.response.data.error);
    const err = error.response.data.error;
    // errorMsg.textContent = err;
    alert(err);
  }
  // console.log(medicineName.value, dosage.value, frequency.value);
});
// Created a new function named getUserMed uses the method name axios and get() to connects to postman keys.
const getUserMed = async () => {
  const { data } = await axios.get(
    "http://localhost:5000/api/v1/medicine/get",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data.allMedicines);
  //using the map() Return a new array with the square root of all element values. inside the map function it holding a few variable as arguments.
  // the return will return the HTML data to the HTML file were it will print the output.
  // object holds key-value pairs and remembers the original insertion order of the keys
  const allMed = await data.allMedicines;
  // const medList = allMed
  //   .map((med) => {
  //     const { _id, medUser, medicineName, frequency, dosage } = med;
  //     return `<div class="each-med"><label>Medicine Name:</label><h3>${medicineName}</h3></div>
  //     <div><label>Medicine Frequency:</label><h2> ${frequency}</h2></div>`;
  //   })
  //   .join("");
  // medContainer.innerHTML = medList;

  const medListTable = allMed
    .map((med) => {
      const { _id, medUser, medicineName, frequency, dosage } = med;
      return `<tr>
       <td>${medicineName}</td> 
       <td>${dosage}</td> 
       <td>${frequency}</td> 
       <td><button data-id = ${_id} class="delete-btn">Delete</button></td> 

      </tr>`;
    })
    .join("");
  // console.log(medListTable);
  const tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = medListTable;

  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      console.log(id);
      // await alert(confirm);
      // confirm("are you sure");

      let text = "Are you sure!";
      if (confirm(text) == true) {
        await axios.delete(
          `http://localhost:5000/api/v1/medicine/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getUserMed();
      } else {
        location.href = "user.html";
      }
    });
  });
};

// TOGGLE NAV BAR
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show-nav");
});

// LOGOUT

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", () => {
  console.log("logout clicked");

  localStorage.clear()
  window.location = "index.html"
});
