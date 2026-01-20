function tampilkanKaryawan() {
  const tbody = document.getElementById("listKaryawan");
  if (!tbody) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  tbody.innerHTML = "";

  const karyawan = users.filter(u => u.role !== "admin");

  if (karyawan.length === 0) {
    tbody.innerHTML = `<tr><td colspan="2">Belum ada karyawan</td></tr>`;
    return;
  }

  karyawan.forEach((u, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${u.username}</td>
    `;
    tbody.appendChild(tr);
  });
}

function showSection(id) {
  const role = localStorage.getItem("role");

  if (id === "karyawan" && role !== "admin") {
    alert("Akses ditolak");
    return;
  }

  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });

  document.getElementById(id).style.display = "block";

  if (id === "karyawan") tampilkanKaryawan();
  if (id === "riwayat") tampilkan();
}

function cekMenuAdmin() {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    const menu = document.querySelector('[onclick="showSection(\'karyawan\')"]');
    if (menu) menu.style.display = "none";
  }
}

cekMenuAdmin();