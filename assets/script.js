const $ = document.querySelector.bind(document);

// Form state management
const form = $("#ticketForm");
const fileInput = $("#avatar");
const uploadArea = $(".upload-area");
const avatarPreview = $("#avatarPreview");

// File upload handling
fileInput.addEventListener("change", handleFileUpload);
$("#removeAvatar").addEventListener("click", removeAvatar);
$("#changeAvatar").addEventListener("click", () => fileInput.click());

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.src = e.target.result;
      uploadArea.classList.add("has-file");
    };
    reader.readAsDataURL(file);
  }
}

function removeAvatar() {
  fileInput.value = "";
  avatarPreview.src = "";
  uploadArea.classList.remove("has-file");
}

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    // Show success screen
    showSuccessScreen();
  } else {
    // Show error state
    form.classList.add("error");
    setTimeout(() => {
      form.classList.remove("error");
    }, 3000);
  }
});

function showSuccessScreen() {
  // Get form data
  const formData = new FormData(form);
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const github = formData.get("github");

  // Update success screen with form data
  $("#successName").textContent = fullName + "!";
  $("#successEmail").textContent = email;
  $("#ticketName").textContent = fullName;
  $("#ticketGithub").textContent = github;

  // Set avatar if uploaded
  if (avatarPreview.src) {
    $("#ticketAvatar").src = avatarPreview.src;
  }

  // Hide form and show success screen
  $("#initialScreen").setAttribute("hidden", "true");
  $("#successScreen").removeAttribute("hidden");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}
