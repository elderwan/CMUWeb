// TASK A2: Implement GET with fetch (Random User)
// Requirements:
// 1) Show status: "Loading..."
// 2) Hide previous result (if any)
// 3) Fetch from: https://randomuser.me/api/
// 4) If (!res.ok) show error message
// 5) Parse JSON and render: name + email + avatar
// 6) Show status: "Loaded successfully."
//
// Must-have pattern: async/await, try/catch, res.ok, await res.json()

// 0) Access HTML elements (IDs required: btnLoad, status, result)
const loadUserBtn = document.getElementById("btnLoad");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

// 1) Add click event listener to Load user button
// Hint: loadUserBtn.addEventListener("click", async () => { ... });

loadUserBtn.addEventListener("click", async () => {
  // 2) UI state: show loading + disable button
  statusDiv.textContent = "Loading...";
  loadUserBtn.disabled = true;

  //diable change the color
  loadUserBtn.classList.add("opacity-50", "cursor-not-allowed");
  // 3) Hide previous result (required)
  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";

  try {
    // 4) Fetch random user data
    const res = await fetch("https://randomuser.me/api/");
    // 5) Check res.ok (HTTP errors do not throw automatically)
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // 6) Parse JSON
    const data = await res.json();
    const user = data.results[0];
    // 7) Render name + email + avatar into resultDiv
    resultDiv.innerHTML =
      user.name.title +
      " " +
      user.name.first +
      " " +
      user.name.last +
      "<br>" +
      user.email +
      "<br>" +
      `<img src="${user.picture.medium}" alt="Avatar">`;
    // 8) Show result area (remove "hidden")
    resultDiv.classList.remove("hidden");
    // 9) Status success
    statusDiv.textContent = "Loaded successfully.";
  } catch (err) {
    // 10) Status error
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    // 11) Re-enable button (always)
    loadUserBtn.disabled = false;
    loadUserBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
});

const clearBtn = document.getElementById("btnReset");

clearBtn.addEventListener("click", async () => {
  //clear the text area after sending
  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";
  statusDiv.textContent = "";

  //reset the load btn
  loadUserBtn.disabled = false;
  loadUserBtn.classList.remove("opacity-50", "cursor-not-allowed");
});
