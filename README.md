🐝 BeeSmart – The Spelling Bee Game

An interactive web-based spelling game built using **HTML**, **CSS**, and **JavaScript** that uses **real-time APIs** to test spelling skills in a fun and educational way. Players can select their avatar, choose accents, pick levels, and play a spelling challenge powered by live word data from the web.

🧠Overview

BeeSmart allows users to:

* Enter their name and choose an avatar.
* Select a language accent (Indian or American English).
* Pick their difficulty level (Beginner → Advanced).
* Listen to words using the browser’s **speech synthesis feature**.
* Type and submit their spelling.
* Get instant feedback with meaning and synonyms of the word.


⚙️Technologies Used

* **HTML5** – For the website structure and multiple interactive screens.
* **CSS3** – For layout, theming, and animations.
* **JavaScript (ES6)** – For logic, API integration, and interactivity.
* **Web Speech API** – For text-to-speech pronunciation.
* **Fetch API** – For fetching live word and meaning data from the internet.

🌐 APIs Used

1. Random Word API
   Endpoint: `https://random-word-api.herokuapp.com/word`
   → Generates a random English word for each game round.

2. Free Dictionary API
   Endpoint: `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`
   → Provides meaning and synonyms for the generated word.

🎮 Game Flow

1. **Name Screen** → User enters their name.
2. **Avatar Selection** → Player chooses their character.
3. **Accent Selection** → Choose the preferred accent for pronunciation.
4. **Level Selection** → Beginner, Easy, Intermediate, or Advanced.
5. **Game Area** → Hear the word, type the spelling, and submit.
6. **Score Display** → See score and chances left in real-time.
7. **Game Over Screen** → Final score with restart option.

📜Key JavaScript Concepts

* **DOM Manipulation** – Dynamically updates the game screens.
* **Event Listeners** – Handle button clicks and form submissions.
* **Async/Await** – Handles API calls for random words and meanings.
* **SpeechSynthesisUtterance** – Converts text to spoken word.
* **Custom Functions** – `switchTo()`, `show()`, `hide()`, and `startGame()` manage screen flow.
* **Game Logic** – Tracks player score, chances, and word validation.



How It Works

* When the player clicks **Start**, JavaScript calls the Random Word API.
* The word is read aloud using `speechSynthesis`.
* The player types their spelling — it’s checked in real time.
* If correct, meaning and synonyms are fetched using the Dictionary API.
* Scores update instantly; incorrect attempts reduce the chance counter.
* Timer and levels make the game progressively challenging.

Networking & Hosting

 Hosted using Netlify
  🔗(https://69016ce0344624ed6cab4653--dainty-vacherin-c64991.netlify.app/)
Analyzed network behavior using **Wireshark** to study:

  * DNS resolution (`netlify.app → IP`)
  * TCP Handshake (SYN, SYN-ACK, ACK)
  * TLS Handshake (Client Hello, Server Hello)
  * API request/response packets over HTTPS (port 443)

Future Improvements

* Add a leaderboard for top scores.
* Include multi-player or timed competition mode.
* Integrate additional APIs for word difficulty grading.
* Support for more accents or languages.
Developed by

Team BeeSmart (Atria University)

* Rachana S
* Rashika S
* Ashmitha R


