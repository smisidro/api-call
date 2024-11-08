let meme = document.getElementById("meme");
let title = document.getElementById("title");
let getMemeBtn = document.getElementById("get-meme-btn");
let prevMemeBtn = document.getElementById("prev-meme");
let nextMemeBtn = document.getElementById("next-meme");

// API URL
let url = "https://meme-api.com/gimme/";

// Array of subreddits of your choice
let subreddits = ["catmemes", "wholesomemes", "dogmemes", "me_irl"];

// Array to store memes and current index
let memes = [];
let currentIndex = 0;

// Function to display a meme at the current index
let displayMeme = (index) => {
  if (index >= 0 && index < memes.length) {
    meme.src = memes[index].url;
    title.innerHTML = memes[index].title;
  }
  // Enable/disable buttons based on current index
  prevMemeBtn.disabled = index <= 0;
  nextMemeBtn.disabled = index >= memes.length - 1;
};

// Function to navigate between memes
let navigateMeme = (direction) => {
  if (direction === "prev" && currentIndex > 0) {
    currentIndex--;
  } else if (direction === "next" && currentIndex < memes.length - 1) {
    currentIndex++;
  }
  displayMeme(currentIndex);
};

// Function to get a random meme from the API and add it to the array
let getMeme = () => {
  let randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
  console.log("Selected subreddit:", randomSubreddit);

  fetch(url + randomSubreddit)
    .then((resp) => {
      if (!resp.ok) throw new Error("Network response was not ok");
      return resp.json();
    })
    .then((data) => {
      let memeImg = new Image();

      memeImg.onload = () => {
        memes.push({ url: data.url, title: data.title });
        currentIndex = memes.length - 1; // Update current index
        displayMeme(currentIndex);
        console.log("Meme loaded:", data.url);
      };

      memeImg.onerror = () => console.error("Image failed to load.");
      memeImg.src = data.url;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      title.innerHTML = "Failed to load meme. Please try again!";
    });
};

// Set a default demo meme image and title on page load
window.addEventListener("load", () => {
  meme.src = "demomeme.png";
  title.innerHTML = "Uy IT ka pala eh<br>paayos ng ref.";
  prevMemeBtn.disabled = true;
  nextMemeBtn.disabled = true;
});

// Button to fetch a new meme
getMemeBtn.addEventListener("click", getMeme);

// Buttons to navigate between memes
prevMemeBtn.addEventListener("click", () => navigateMeme("prev"));
nextMemeBtn.addEventListener("click", () => navigateMeme("next"));
