const apiKey = "at_sKJIFLOCAKqKccyWP80olNG4oMGhg";
const searchBtn = document.querySelector(".search-btn");
const ipAddressInput = document.querySelector(".search-inp");
const ipRes = document.querySelector(".ip-res");
const locRes = document.querySelector(".loc-res");
const tzRes = document.querySelector(".tz-res");
const ispRes = document.querySelector(".isp-res");
const results = document.querySelector(".results");
const res = document.querySelectorAll(".res");
const closeRes = document.querySelector(".close-results");

const harita = L.map("harita").setView([51.505, -0.09], 13);
const isaretci = L.marker([51.5, -0.09]).addTo(harita);

const updateMap = (latitude, longitude) => {
  harita.setView([latitude, longitude], 13);
  isaretci.setLatLng([latitude, longitude]);
  isaretci
    .bindPopup("<b>Mevcut Konum</b><br>Numan tarafından kodlandı.")
    .openPopup();
};

closeRes.addEventListener("click", () => {
  results.classList.toggle("closed");
  res.forEach((res) => res.classList.toggle("d-none"));
  if (results.classList.contains("closed")) {
    closeRes.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;
    results.style.height = "5px";
  } else {
    closeRes.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
    results.style.height = "auto";
  }
});

searchBtn.addEventListener("click", () => {
  const userInput = ipAddressInput.value;
  const isDomain = userInput.includes(".");
  let url;

  if (isDomain) {
    url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${userInput}`;
  } else {
    url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${userInput}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      ipRes.innerText = `${data.ip}`;
      locRes.innerText = `${data.location.country}-${data.location.region}`;
      tzRes.innerText = `${data.location.timezone}`;
      ispRes.innerText = `${data.isp}`;

      const latitude = data.location.lat;
      const longitude = data.location.lng;
      updateMap(latitude, longitude);
    })
    .catch((error) => console.error("Hata:", error));
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(harita);
