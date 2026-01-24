document.querySelectorAll(".like-btn").forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const id = button.id;
    button.textContent = "Liking...";

    try {
      const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      button.textContent = `Likes:${data.likes} `;
    } catch (error) {
      button.textContent = `Failed to like: ${error.message}`;
    } finally {
      button.disabled = false;
    }
  });
});
