function sendMessage() {
  var name    = document.getElementById("name").value.trim();
  var email   = document.getElementById("email").value.trim();
  var phone   = document.getElementById("phone").value.trim();
  var message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  alert("Your message has been sent successfully! We will get back to you soon.");

  document.getElementById("name").value    = "";
  document.getElementById("email").value   = "";
  document.getElementById("phone").value   = "";
  document.getElementById("message").value = "";
}
