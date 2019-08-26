function sameConf(){
  event.preventDefault();
  let confPass = document.getElementsByName("confPassword")[0].value;
  let newPass = document.getElementsByName("newPassword")[0].value;
  let email = document.getElementsByClassName('input-email')[0].value;

  if(email == ''){
    alert('Please Fill in your email');
    return false;
  } else if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
    alert("You have entered an invalid email address!")
    return false;
  } else if(newPass == ''){
    alert('Please Fill in the New Password');
    return false;
  } else if(confPass == ''){
    alert('Please Fill in the Confirmation Password');
    return false;
  } else if(newPass != confPass){
    alert("Password does not match");
    return false;
  } else if(newPass.length < 8){
    alert("Password must be 8 characters long");
    return false;
  }

  document.location.href = '../index.html';
}