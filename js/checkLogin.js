function checkLogin(){
  event.preventDefault();
  // let confPass = document.getElementsByName("confPassword")[0].value;
  let pass = document.getElementsByName("password")[1].value;
  let username = document.getElementsByName("username")[0].value;

  if(username == ''){
    alert('Please Fill in the Username');
    return false;
  } else if(pass == ''){
    alert('Please Fill in the Password');
    return false;
  } else if(pass.length < 8){
    alert("Password must be 8 characters long");
    return false;
  }

  document.location.href = '../index.html';
}