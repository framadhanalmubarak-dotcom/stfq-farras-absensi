function cekAdmin() {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Akses ditolak");
      location.href = "absensi.html";
    }
  }
  
  function tambahKaryawan() {
    const u = document.getElementById("newUsername").value;
    const p = document.getElementById("newPassword").value;
  
    if (!u || !p) {
      alert("Username & password wajib diisi");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (users.find(user => user.username === u)) {
      alert("Username sudah ada");
      return;
    }
  
    users.push({
      username: u,
      password: p,
      role: "karyawan"
    });
  
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Karyawan berhasil ditambahkan");
  
    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";
  }
  