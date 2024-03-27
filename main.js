const API = "https://api.sampleapis.com/avatar/characters";
const characterContainer = document.getElementById("root");

fetch(API)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((character) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const img = document.createElement("img");
      //url de la img de la api, que no lee el src:
      const URL_img_complete = character.image;
      //dejo la url hasta el png para que funcione:
      const URL_img_png = URL_img_complete.split(".png")[0] + ".png";

      img.src = URL_img_png;
      img.alt = character.name;
      const name = document.createElement("h2");
      name.textContent = character.name;
      const nationality = document.createElement("p");
      nationality.textContent = "Nationality: " + character.bio.nationality;
      const ethnicity = document.createElement("p");
      ethnicity.textContent = "Ethnicity: " + character.bio.ethnicity;
      const weapons = document.createElement("p");
      weapons.textContent =
        "Weapons: " + character.personalInformation.weaponsOfChoice;
      console.log(name);
      console.log(weapons);

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(nationality);
      card.appendChild(ethnicity);
      card.appendChild(weapons);

      characterContainer.appendChild(card);

      //Funcion de filtrado
      const inputEl = document.querySelector(".search-container input");
      const buttonEl = document.querySelector(".search-container button");
      const cardsEl = document.querySelectorAll(".card");

      buttonEl.addEventListener("click", () => {
        const inputText = inputEl.value.toLowerCase();

        cardsEl.forEach((card) => {
          const name = card.querySelector("h2").textContent.toLowerCase();
          const display = name.includes(inputText) ? "inherit" : "none";
          card.style.display = display;
        });
      });
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
