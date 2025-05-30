console.log("Hallo Wereld");

let kaartjes = document.querySelectorAll("img");
let afbeeldingen = [
  "images/hert.jpg",
  "images/pinguin.jpg",
  "images/dolfijn.jpg",
  "images/hert.jpg",
  "images/tijger.jpg",
  "images/kameleon.jpg",
  "images/pinguin.jpg",
  "images/tijger.jpg",
  "images/dolfijn.jpg",
  "images/kameleon.jpg",
];

afbeeldingen.sort(function () {
  return Math.random() - 0.5;
});

let openKaarten = [];
let score = 0;
let scoreTellen = document.getElementById("score");
let pScoreVervangen = document.querySelector(".pScore");
const dialogWin = document.getElementById("gewonnenVenster");

//Audio informatie: ChatGPT 4o; 2025, Prompt: "Hoe voeg ik een geluidje toe aan wanneer je de game hebt uitgespeelt?"
const matchPingGeluid = new Audio("geluid/ping.mp3"); //Geluid komt van: https://www.youtube.com/watch?v=nANWDdsCG5U "Ping sound effect"
const winGeluid = new Audio("geluid/winGeluid.mp3"); //Geluid komt van: https://www.youtube.com/watch?v=rr5CMS2GtCY "WIN sound effect no copyright"

//forEach() informatie: ChatGPT 4o; 2025, Prompt: "Hoe kan ik er voor zorgen met een forEach() dat wanneer twee dezelfde kaartjes worden omgedraaid dat ze dan open blijven staan?"
kaartjes.forEach((kaartje, index) => {
  let isMatched = false;
  const juisteAfbeelding = afbeeldingen[index];

  kaartje.src = "images/dicht.jpg";

  kaartje.addEventListener("click", () => {
    console.log("Klik!");
    if (
      openKaarten.includes(kaartje) ||
      isMatched ||
      !kaartje.src.includes("images/dicht.jpg") || //kaartje.src !== location.origin + "/images/dicht.jpg" werkte wel met lifeserver, niet met GitHub Pages. ChatGPT 4o; 2025, Prompt: "Waarom zorgt die / er voor dat ik een kaartje wel om kan draaien via de liveserver en via github niet?"
      openKaarten.length == 2
    ) {
      return;
    }

    kaartje.src = juisteAfbeelding;
    openKaarten.push(kaartje);

    if (openKaarten.length === 2) {
      const [kaart1, kaart2] = openKaarten;

      if (kaart1.src === kaart2.src) {
        score++;
        scoreTellen.innerText = score;
        pScoreVervangen.textContent = "Score: " + score + "/5";
        matchPingGeluid.play();
        openKaarten = [];

        if (score === 5 && tijd > 0) {
          clearInterval(aftellenTimer);
          pScoreVervangen.textContent = "Goed gedaan!";
          pScoreVervangen.style.fontSize = "1.3em";
          pScoreVervangen.style.color = "Green";

          function winPopup() {
            dialogWin.showModal("gewonnenVenster"); //Dialog "pop-up" uitgewerkt na suggestie van de docent.
            winGeluid.play();
          }
          setTimeout(winPopup, 1500);
        }
      } else {
        function kaartenDicht() {
          kaart1.src = "images/dicht.jpg";
          kaart2.src = "images/dicht.jpg";
          openKaarten = [];
        }
        setTimeout(kaartenDicht, 850);
      }
    }
  });
});

let tijd = 25;
let timerElement = document.getElementById("timerAftellen");
let aftellenTimer = setInterval(aftellen, 1000);
let pVervangen = document.querySelector(".pSeconden");
const dialogVerlies = document.getElementById("gameOverVenster");
const vijfSeconden = new Audio("geluid/vijfSeconden2.mp3"); //Geluid komt van: https://www.youtube.com/watch?v=o5jaeEUbpFc "Clock Ticking Sound Effect"
const verliesGeluid = new Audio("geluid/verliesGeluid.mp3"); //Geluid komt van: https://www.youtube.com/watch?v=jAIlKqL3nHo "Lose sound effects"

function aftellen() {
  tijd--;
  timerElement.innerText = tijd;

  if (tijd <= 5) {
    timerAftellen.style.color = "red";
    vijfSeconden.play();

    if (tijd === 0) {
      clearInterval(aftellenTimer);
      pVervangen.textContent = "Je tijd is op!";
      pVervangen.style.fontSize = "2em";
      pVervangen.style.color = "red";

      function verliesPopup() {
        dialogVerlies.showModal("gameOverVenster"); //Dialog "pop-up" uitgewerkt na suggestie van de docent.
        verliesGeluid.play();
      }
      setTimeout(verliesPopup, 1500);
    }
  }
}
