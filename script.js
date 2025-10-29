const screens = {
  name: document.getElementById("nameScreen"),
  avatar: document.getElementById("avatarScreen"),
  accent: document.getElementById("accentScreen"),
  level: document.getElementById("levelScreen"),
  game: document.getElementById("gameArea"),
  over: document.getElementById("gameOver"),
};

const btn = (id) => document.getElementById(id);

// Main buttons
const nextWordBtn = btn("nextWordBtn"),
      speakBtn = btn("speakBtn"),
      submitBtn = btn("submitBtn"),
      skipBtn = btn("skipBtn"),
      endGameBtn = btn("endGameBtn"),
      restartBtn = btn("restartBtn");

// Info elements
const playerNameInput = btn("playerName"),
      message = btn("message"),
      scoreDisplay = btn("scoreDisplay"),
      chancesDisplay = btn("chancesDisplay"),
      meaning = btn("meaning"),
      synonyms = btn("synonyms"),
      wordInfo = btn("wordInfo"),
      timerDisplay = btn("timerDisplay"),
      finalScore = btn("finalScore");

let playerName = "", accent = "", level = "", currentWord = "";
let score = 0, chances = 0, usedWords = [], timer = null;

//Small Helpers
function show(e){ e.classList.remove("hidden"); }
function hide(e){ e.classList.add("hidden"); }
function switchTo(screen){ Object.values(screens).forEach(hide); show(screen); }

//Navigation
btn("nameNextBtn").onclick = () => {
  if (!playerNameInput.value.trim()) return alert("Please enter your name!");
  playerName = playerNameInput.value.trim();
  switchTo(screens.avatar);
};

btn("avatarBackBtn").onclick = () => switchTo(screens.name);
btn("avatarNextBtn").onclick = () => switchTo(screens.accent);
btn("accentBackBtn").onclick = () => switchTo(screens.avatar);
btn("accentNextBtn").onclick = () => {
  if (!accent) return alert("Select an accent first!");
  switchTo(screens.level);
};
btn("levelBackBtn").onclick = () => switchTo(screens.accent);

/* -------- Avatar Selection -------- */
document.querySelectorAll(".avatar").forEach(img=>{
  img.onclick = ()=> {
    document.querySelectorAll(".avatar").forEach(i=>i.classList.remove("selected"));
    img.classList.add("selected");
  };
});

//Accent Selection
document.querySelectorAll(".flag-btn").forEach(flag=>{
  flag.onclick = ()=>{
    document.querySelectorAll(".flag-btn").forEach(f=>f.classList.remove("selected"));
    flag.classList.add("selected");
    accent = flag.dataset.accent;
    speakAccentPreview(accent); 
  };
});

function speakAccentPreview(accentCode){
  const utter = new SpeechSynthesisUtterance("Welcome to BeeSmart");
  utter.lang = accentCode;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

//Level Selection feature in the website 
document.querySelectorAll(".level").forEach(lvl=>{
  lvl.onclick = ()=>{
    level = lvl.dataset.level;
    startGame();
  };
});

//Game Logic:Using Free APIs to get Random Words and their Meanings
async function getWord(){
  const res = await fetch("https://random-word-api.herokuapp.com/word");
  const data = await res.json();
  return data[0];
}

async function getMeaning(word){
  try{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const j = await res.json();
    return {
      def: j[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found",
      syn: j[0]?.meanings?.[0]?.definitions?.[0]?.synonyms?.slice(0,5).join(", ") || "None"
    };
  }catch{ return {def:"No data", syn:"None"}; }
}

function levelChances(){
  return level==="Advance"?1:level==="Intermediate"?2:level==="Easy"?3:5;
}

function startTimer(){
  clearInterval(timer);
  let t=60; show(timerDisplay);
  timerDisplay.textContent=`⏱ ${t}s`;
  timer=setInterval(()=>{
    t--; timerDisplay.textContent=`⏱ ${t}s`;
    if(t<=0){ clearInterval(timer); endGame(); }
  },1000);
}

async function newRound(){
  hide(wordInfo); hide(nextWordBtn);
  message.textContent=""; answerInput.value="";
  currentWord = await getWord();
  chances = levelChances();
  chancesDisplay.textContent = `Chances left: ${chances}`;
  if(level==="Easy") startTimer(); else hide(timerDisplay);
}

function startGame(){
  score=0; usedWords=[]; scoreDisplay.textContent=`Score: ${score}`;
  switchTo(screens.game);
  newRound();
}

// /Game controls
speakBtn.onclick = ()=> speakWord(currentWord);
submitBtn.onclick = async ()=>{
  const guess = answerInput.value.trim().toLowerCase();
  if(!guess) return alert("Type your spelling first!");
  if(guess===currentWord.toLowerCase()){
    score++; scoreDisplay.textContent=`Score: ${score}`;
    const info=await getMeaning(currentWord);
    meaning.textContent=info.def; synonyms.textContent=info.syn;
    show(wordInfo); show(nextWordBtn); message.textContent="✅ Correct!";
  }else{
    chances--; chancesDisplay.textContent=`Chances left: ${chances}`;
    message.textContent = chances>0 ? "❌ Wrong! Try again." : `💡 The word was: ${currentWord}`;
    if(chances<=0){
      const info=await getMeaning(currentWord);
      meaning.textContent=info.def; synonyms.textContent=info.syn;
      show(wordInfo); show(nextWordBtn);
    }
  }
};
skipBtn.onclick = newRound;
nextWordBtn.onclick = newRound;
endGameBtn.onclick = endGame;
restartBtn.onclick = ()=>location.reload();

//To hear the accent Speak Function
function speakWord(word){
  if(!word){ alert("No word yet!"); return; }
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = accent || "en-US"; // for picking the chosen accent
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// The following piece of code opeartes as an End Game feature in the website
function endGame(){
  clearInterval(timer);
  switchTo(screens.over);
  finalScore.textContent = `${playerName}, your final score is ${score}`;
}

//In website it is used as Back Buttons on Screens
document.querySelectorAll(".secondary").forEach(b=>{
  b.addEventListener("click", ()=> speechSynthesis.cancel()); // stop any voice when going back
});
