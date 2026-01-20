let nama = localStorage.getItem("currentUser") || "User";
nama = nama.toUpperCase();

document.getElementById("namaUser").innerText = nama;
document.getElementById("avatar").innerText = nama[0];

function updateDateTime() {
  const now = new Date();

  const tanggal = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const jam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  document.getElementById("datetime").innerText =
    `${tanggal} | ${jam}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);
