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

const currentUser = localStorage.getItem("currentUser");

  absen.push({
    user: currentUser,
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

  let masuk = keMenit(data.masuk);
  let keluar = keMenit(data.keluar);

  if (keluar <= masuk) {
    keluar += 24 * 60;
  }

  let totalMenit = keluar - masuk;
  data.total = (totalMenit / 60).toFixed(2);

  saveAbsen(absen);
  tampilkan();
}

function hapus(tgl) {
  if (!confirm("Yakin ingin menghapus data absensi ini?")) return;

  let absen = getAbsen().filter(a => a.date !== tgl);
  saveAbsen(absen);
  tampilkan();
}

function tampilkan() {
  const tbody = document.getElementById("tabelAbsen");
  if (!tbody) return;

  const currentUser = localStorage.getItem("currentUser");
  const role = localStorage.getItem("role");

  tbody.innerHTML = "";

  let data = getAbsen();

  if (role !== "admin") {
    data = data.filter(a => a.user === currentUser);
  }

  data.forEach(a=> {

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Belum ada data absensi</td></tr>`;
    return;
  }
  });

  getAbsen().forEach(a => {
    const tr = document.createElement("tr");

    if (a.keluar && a.total < 8) tr.classList.add("kurang");
    if (a.keluar && a.total >= 8) tr.classList.add("cukup");

    tr.innerHTML = `
  <td>${a.user}</td>
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
  
  let masuk = keMenit(data.masuk);
  let keluar = keMenit(data.keluar);

  if (keluar <= masuk) {
    keluar += 24 * 60;
  }

  let totalMenit = keluar - masuk;
  data.total = (totalMenit / 60).toFixed(2);

  saveAbsen(absen);
  tampilkan();
}
