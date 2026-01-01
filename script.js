function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (u === "" || p === "") {
    alert("username dan password wajib diisi");
    return;
  }

  localStorage.setItem("login", "true");
  localStorage.setItem("currentUser", u);

  location.href = "absensi.html";
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

function getAbsen() {
  return JSON.parse(localStorage.getItem("absen")) || [];
}

function saveAbsen(data) {
  localStorage.setItem("absen", JSON.stringify(data));
}

function absenMasuk() {
  const today = new Date().toISOString().split("T")[0];
  let absen = getAbsen();

  if (absen.find(a => a.date === today)) {
    return alert("Sudah absen masuk");
  }

  absen.push({
    date: today,
    masuk: new Date().toLocaleTimeString(),
    keluar: null,
    total: 0
  });

  saveAbsen(absen);
  tampilkan();
}

function keMenit(jam) {
  jam = jam.replaceAll(".", ":");
  let [h, m, s] = jam.split(":").map(Number);
  return h * 60 + m + (s ? s / 60 : 0);
}

function absenKeluar(tgl) {
  let absen = getAbsen();
  let data = absen.find(a => a.date === tgl);
  if (!data || !data.masuk) return;

  let jamKeluar = new Date().toTimeString().split(" ")[0];
  data.keluar = jamKeluar;

  let totalMenit = keMenit(data.keluar) - keMenit(data.masuk);
  data.total = Number((totalMenit / 60).toFixed(2));

  saveAbsen(absen);
  tampilkan();
}

function hapus(tgl) {
  let absen = getAbsen().filter(a => a.date !== tgl);
  saveAbsen(absen);
  tampilkan();
}

function tampilkan() {
  const tbody = document.getElementById("tabelAbsen");
  if (!tbody) return;

  tbody.innerHTML = "";
  getAbsen().forEach(a => {
    const tr = document.createElement("tr");

    if (a.keluar && a.total < 8) tr.classList.add("kurang");

    tr.innerHTML = `
  <td>${a.date}</td>
  <td>${a.masuk || "-"}</td>
  <td>${a.keluar || "-"}</td>
  <td>${a.total || "-"}</td>
  <td>
    <button class="edit" onclick="editJam('${a.date}')">Edit</button>
    <button class="keluar" onclick="absenKeluar('${a.date}')">Keluar</button>
    <button class="hapus" onclick="hapus('${a.date}')">Hapus</button>
  </td>
`;

    tbody.appendChild(tr);
  });
}

tampilkan();

function editJam(tgl) {
  let absen = getAbsen();
  let data = absen.find(a => a.date === tgl);
  if (!data) return;

  let masukBaru = prompt("Masukkan jam masuk (HH:MM:SS)", data.masuk);
  let keluarBaru = prompt("Masukkan jam keluar (HH:MM:SS)", data.keluar);

  if (!masukBaru || !keluarBaru) {
    alert("Jam tidak boleh kosong");
    return;
  }

  data.masuk = masukBaru;
  data.keluar = keluarBaru;

  function keMenit(jam) {
    let [h, m, s] = jam.split(":").map(Number);
    return h * 60 + m + (s ? s / 60 : 0);
  }
  
  let totalMenit = keMenit(keluarBaru) - keMenit(masukBaru);
  data.total = Number((totalMenit / 60).toFixed(2));

  saveAbsen(absen);
  tampilkan();
}
