function initAdmin() {
  let users = JSON.parse(localStorage.getItem("users"));

  if (!users || users.length === 0) {
    users = [
      {
        username: "admin",
        password: "admin123",
        role: "admin"
      }
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
}

initAdmin();
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    user => user.username === u && user.password === p
  );

  if (!user) {
    alert("Username atau password salah");
    return;
  }

  localStorage.setItem("login", "true");
  localStorage.setItem("currentUser", u);
  localStorage.setItem("role", user.role);

  location.href = "absensi.html";
}

function register() {
  const u = document.getElementById("regUsername").value;
  const p = document.getElementById("regPassword").value;

  if (u === "" || p === "") {
    alert("username dan password wajib diisi");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(user => user.username === u)) {
    alert("Username sudah terdaftar");
    return;
  }

  users.push({
    username: u,
    password: p,
    role: "karyawan"
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Register berhasil, silakan login");
  location.href = "index.html";
}

function logout() {
  localStorage.removeItem("login");
  location.href = "index.html";
}

function cekLogin() {
  if (!localStorage.getItem("login")) {
    location.href = "index.html";
  }
}

function cekRegister() {
  if (localStorage.getItem("role") === "admin") {
    const btn = document.getElementById("btnRegister");
    if (btn) btn.style.display = "none";
  }
}

function cekMenuAdmin() {
  const role = localStorage.getItem("role");
  document.querySelectorAll("admin-only").forEach(menu => {
    if (role !== "admin") {
      menu.style.display = "none";
    }
  });
}

window.onload = function () {
  cekMenuAdmin();
};
