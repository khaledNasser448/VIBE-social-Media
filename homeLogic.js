
function editPostBtnClicked(postObject){
    let post = JSON.parse(decodeURIComponent(postObject))
    document.getElementById("idPost").value = post.id
    document.getElementById("add-modal-header").innerHTML= `edit your vibe !`
    document.getElementById("create-post-title").value = post.title
    document.getElementById("create-post-body").value = post.body
    document.getElementById("post-btn").innerHTML = `Edit`
    let editModal = new bootstrap.Modal(document.getElementById("creat-bost-btn"),{})
    editModal.toggle()
    
    
   
}
function ceatBostBtnClicked(){
    document.getElementById("add-modal-header").innerHTML= `create a new vibe !`
    document.getElementById("create-post-title").value = ""
    document.getElementById("create-post-body").value = ""
    document.getElementById("post-btn").innerHTML = `post`
    let editModal = new bootstrap.Modal(document.getElementById("creat-bost-btn"),{})
    editModal.toggle()  
}
function deleteBtnClicked(postObject){
    let post = JSON.parse(decodeURIComponent(postObject))
    document.getElementById("delete-modal-input").value= post.id
    let editModal = new bootstrap.Modal(document.getElementById("delete-modal"),{})
    editModal.toggle()  
    
}
function confirmDeleteBOst(){
    let postId =  document.getElementById("delete-modal-input").value
    let url = `${baseUrl}/posts/${postId}`
    let token = localStorage.getItem("token")
    let headers = {
        "Content-Type" : "multipart/form-data",
        "authorization" : `Bearer ${token}`
    }
    axios.delete(url, {
        headers: headers
    })
    .then(function (response) {
        showAlert('your vibe has been deleted succesfully!','bg-success');
        const deleteModal = document.getElementById('delete-modal');
        const modalInstance = bootstrap.Modal.getInstance(deleteModal);
        modalInstance.hide()
        getPosts()

    }).catch((err)=>{
        const error = err.response.data.message
        showAlert(error,'bg-danger');
        setTimeout(() => {
        successAlert.classList.remove('bg-danger')  
      }, 4000);
      }) 
    
}