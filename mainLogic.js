const baseUrl =`https://tarmeezacademy.com/api/v1`

function setupui(){
    let logInAndRegisterDiv = document.getElementById("logAndRegDiv")
    let token = localStorage.getItem("token");
    let logAndRegDiv = document.getElementById('logAndRegDiv');
    let logOutDiv = document.getElementById('logoutDiv')
    let UserName = document.getElementById("userName")
    let UserImage = document.getElementById("userImage")
    let user = getCurrentuser()
    if(token){
     logOutDiv.style.display = 'flex'
     logAndRegDiv.style.display = 'none'
     UserName.innerHTML = user.username
     UserImage.src = user.profile_image
    }else{
     logAndRegDiv.style.display = 'flex'
     logOutDiv.style.display = 'none'
    }
    
   }
// ===========   Auth Functions ======== 
// ===log in===
function logInBtnClicked() {
    let userName = document.getElementById("username-logIn-input").value
    let password = document.getElementById("password-logIn-input").value
    const navUserImage = document.getElementById("nav-userImage");
    const NavUserName = document.getElementById("nav-userName");
    let params = {
      username: userName ,
      password : password
    }
    axios.post(`${baseUrl}/login`,params )
  .then(function (response) {
    let token = response.data.token;
    localStorage.setItem(`token`, token)
    localStorage.setItem(`user`, JSON.stringify(response.data.user))
    const logInModal = document.getElementById('logIn-btn');
    const modalInstance = bootstrap.Modal.getInstance(logInModal);
    modalInstance.hide()
    showAlert('You looged in successfully !','bg-success');
    setupui();
  })
  .catch(function (error) {
    // showAlert(error.response.data.message,'bg-danger');
    setTimeout(() => {
    successAlert.classList.remove('bg-danger')  
  }, 4000);
  });
  }
//   ===register ===
function RegisterBtnClicked() {
    let ReguserName = document.getElementById("username-register-input").value;
    let Regpassword = document.getElementById("password-register-input").value;
    let name = document.getElementById("name-register-input").value;
    let RegImage = document.getElementById("image-register-input").files[0];
    let params = new FormData()
    params.append("username", ReguserName )
    params.append("name", name )
    params.append("password", Regpassword )
    params.append("image", RegImage )
    
    axios.post(`${baseUrl}/register`,params )
    .then(function (response) {
      let token = response.data.token;
      localStorage.setItem(`token`, token)
      localStorage.setItem(`user`, JSON.stringify(response.data.user))
      showAlert('You have Registered successfully!','bg-success');
      setupui();
    }) 
    .catch(function (error) {
      const message = error.response.data.message
      showAlert(message,'bg-danger');
      setTimeout(() => {
      successAlert.classList.remove('bg-danger')  
    }, 4000);
    })
    .finally(function () {
      // always executed
      const gegisterModal = document.getElementById('Register-btn');
      const modalInstance = bootstrap.Modal.getInstance(gegisterModal);
      modalInstance.hide()
    });
  }
   // logOUT function
   function logOutBtnClicked(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setupui();
    showAlert('You looged out successfully !', 'bg-danger');
    setTimeout(() => {
      successAlert.classList.remove('bg-danger')  
    }, 4000);
    
  }
  // ===========   //Auth Functions// ======== 
//   ===================alerts========
function showAlert(message, color) {
    successAlert.textContent = message; // Set the alert message
    successAlert.classList.remove('d-none'); // Show the alert
    successAlert.classList.add(color)  //set the alert color
    setTimeout(() => {
      successAlert.classList.add('d-none'); // Hide the alert after 3 seconds
    }, 3000);
  }
//   =================//alerts//=========
function getCurrentuser(){
    let user = null 
    let userLocalStorage = localStorage.getItem("user");
    if(userLocalStorage != null) 
    {
      user = JSON.parse(userLocalStorage)
    } 
    return user
  }