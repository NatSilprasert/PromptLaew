const browseBtn = document.getElementById("browse-btn");
const imageInput = document.getElementById("imageinput");

browseBtn.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  if (imageInput.files.length > 0) {
    browseBtn.textContent = imageInput.files[0].name; // แสดงชื่อไฟล์
  }
});

const form = document.getElementById("create-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  console.log("Title:", formData.get("title"));
  console.log("Prompt:", formData.get("prompt"));
  console.log("File:", formData.get("imageinput"));
});