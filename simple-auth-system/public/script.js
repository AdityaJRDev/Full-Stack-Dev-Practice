async function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  await axios.post("http://localhost:3000/signup", {
    username,
    password,
  });

  alert("You are signed up");
}

async function signin() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  const response = await axios.post("http://localhost:3000/signin", {
    username,
    password,
  });

  localStorage.setItem("token", response.data.token);
  alert("You are signed in");
}

async function getUserInformation() {
  const token = localStorage.getItem("token");
  if (!token) return; // no token, don't call /me

  const response = await axios.get("http://localhost:3000/me", {
    headers: {
      token: token,
    },
  });

  document.getElementById("information").innerHTML =
    "Username: " +
    response.data.username +
    " Password: " +
    response.data.password;
}

function logout() {
  localStorage.removeItem("token");
  document.getElementById("information").innerHTML = "";
}

// Try to load user info on page load
getUserInformation();
