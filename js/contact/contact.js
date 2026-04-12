function sendMessage(){

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let message = document.getElementById("message").value;

  if(name === "" || email === "" || phone === "" || message === ""){
    alert("⚠️ Please fill all fields");
    return;
  }

  function sendMessage(){
  alert("✅ Your message has been sent successfully!");
}