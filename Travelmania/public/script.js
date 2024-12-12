// Function to toggle between login and signup forms
function toggleForm() {
  const loginSection = document.getElementById("login-section");
  const signupSection = document.getElementById("signup-section");

  if (signupSection.classList.contains("hidden")) {
    signupSection.classList.remove("hidden");
    loginSection.classList.add("hidden");
  } else {
    signupSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  }
}

// Function to handle login submission
function submitLogin() {
  const form = document.getElementById("login-form");
  const data = {
    username: form.username.value,
    password: form.password.value,
  };

  // Assuming the server endpoint URL is '/login'
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "./index.html"; // Redirect on success
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

// Function to handle signup submission
function submitSignup() {
  const form = document.getElementById("signup-form");
  const data = {
    username: form.username.value,
    email: form.email.value,
    password: form.newPassword.value,
  };

  // Assuming the server endpoint URL is '/signup'
  fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Signup successful! You can now log in.");
        toggleForm(); // Switch to login form after signup
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    });
}
