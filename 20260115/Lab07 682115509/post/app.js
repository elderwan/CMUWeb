// TASK B2: Implement POST with fetch (Send Message)
// Requirements:
// 1) Validate input (if empty → show “Please type a message first.”)
// 2) Show status: “Sending…”
// 3) Send POST request to: https://httpbin.org/post
// 4) Include:
//    - method: "POST"
//    - headers: { "Content-Type": "application/json" }
//    - body: JSON.stringify({ message, createdAt })
// 5) Parse response JSON and display what you sent (echoed JSON)
//
// Output requirements:
// - Show “Sent successfully.” on success
// - Show error message on failure
// - Display JSON nicely formatted: JSON.stringify(obj, null, 2)

// 0) Access HTML elements (IDs required: msg, btnSend, status, output)
const inputMessage = document.getElementById("msg");
const sendBtn = document.getElementById("btnSend");
const statusDiv = document.getElementById("status");
const resultPre = document.getElementById("output");

// 1) Add click event listener to the Send button
// Hint: sendBtn.addEventListener("click", async () => { ... });
sendBtn.addEventListener("click", async () => {
  //disable button to prevent multiple clicks
  sendBtn.disabled = true;
  //diable change the color
  sendBtn.classList.add("opacity-50", "cursor-not-allowed");

  // 2) Read and trim the input value
  const message = inputMessage.value.trim();

  // 3) Validate input: if empty -> show warning and stop

  if (!message) {
    statusDiv.textContent = "Please type a message first.";
    return;
  }

  // 4) UI: show sending state + clear previous output

  statusDiv.textContent = "Sending...";
  resultPre.textContent = "";

  try {
    // 5) Send POST request using fetch()
    const res = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        createdAt: new Date().toISOString(),
      }),
    });

    // 6) Check res.ok (HTTP errors do not throw automatically)
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // 7) Parse JSON response
    const data = await res.json();

    // 8) Display echoed JSON (what we sent back)
    // Hint: data.json contains the sent body in httpbin
    console.log(data.data);
    // const test = JSON.stringify(data.data.json, null, 2);
    // console.log(test);

    //format the json
    const formattedJson = JSON.stringify(JSON.parse(data.data), null, 2);
    resultPre.textContent = formattedJson;
    resultPre.classList.remove("hidden");
    // 9) Success message
    statusDiv.textContent = "Sent successfully.";
  } catch (err) {
    // 10) Error message
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    // Optional: re-enable the button
    sendBtn.disabled = false;
    sendBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
});

const clearBtn = document.getElementById("btnReset");

clearBtn.addEventListener("click", async () => {
  //clear the text area after sending
  inputMessage.value = "";
  resultPre.textContent = "";
  statusDiv.textContent = "";

  //reset the send btn
  sendBtn.disabled = false;
  sendBtn.classList.remove("opacity-50", "cursor-not-allowed");
});
