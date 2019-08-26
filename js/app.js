
// Calling the eventListeners Function
eventListeners();

// eventListeners Function
function eventListeners() {
  const ui = new UI();

  // Hide Preloader when all the images, scripts, links have finished loading
  window.addEventListener("load", function () {
    ui.hidePreloader();
  });

  // Nav Button
  document.querySelector(".navBtn").addEventListener("click", function () {
    ui.showNav();
  });

  // Control the Video
  document.querySelector(".video__switch").addEventListener("click", function () {
    ui.videoControls();
  });

  // Submit the form
  document.querySelector('.drink-form').addEventListener('submit', function (event) {
    // Preventing the default action of jumping to the top of the page when submitting
    event.preventDefault();

    const name = document.querySelector('.input-name').value;
    const lastName = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;
    const phone = document.querySelector('.input-phone').value;
    const password = document.querySelector('.input-pass').value;

    let value = ui.checkEmpty(name, lastName, email, phone, password)

    if (value) {
      let customer = new Customer(name, lastName, email, phone, password);
      ui.addCustomer(customer);
      ui.clearFields();

      ui.showFeedback('Thank You For Signing Up!', 'success')
    } else {
      ui.showFeedback('please fill in your data correctly', 'error')
    }
  })

  //show modal
  const links = document.querySelectorAll('.work-item__icon');

  links.forEach(function (item) {
    item.addEventListener('click', function () {
      ui.showModal();
    })
  })

  //Hide Modal
  document.querySelector('.work-modal__close').addEventListener('click', function () {
    ui.closeModal();
  })

  //show login
  document.querySelector('.log-in__links').addEventListener('click', function () {
    ui.showLogin();
  })

  //hide login
  document.querySelector('.back-btn').addEventListener('click', function () {
    ui.closeLogin();
  })

  //show info
  document.querySelector('.work-modal__info').addEventListener('click', function () {
    ui.showInfo();
  })

  document.querySelector('.sign-up__links').addEventListener('click', function(){
    let btn = document.querySelector('.back-btn');

    event.preventDefault();
    document.location.href = '#drink';
    btn.click();

  })

}

// Constructor Function
function UI() {

}

// Hide Preloader
UI.prototype.hidePreloader = function () {
  document.querySelector('.preloader').style.display = 'none';
}


// Show Nav Btn
UI.prototype.showNav = function () {
  document.querySelector('.nav').classList.toggle('nav--show');

  if (document.querySelector('.nav').classList.contains('nav--show')) {
    setTimeout(function () {
      document.querySelector('.nav').classList.remove('nav--show');
    }, 30000)
  }

};


// On or Off Button for Video
UI.prototype.videoControls = function () {
  let btn = document.querySelector('.video__switch-btn');

  if (!btn.classList.contains('button--slide')) {
    btn.classList.add('button--slide');
    document.querySelector('.video__item').pause()
  } else {
    btn.classList.remove('button--slide');
    document.querySelector('.video__item').play()
  }
}

//  Check for empty values
UI.prototype.checkEmpty = function (name, lastName, email, phone, password) {
  let result;
  // [0-9]{3}-[0-9]{3}-[0-9]{4}
  let reg =/^\d{3}-\d{3}-\d{4}$/;
  if (name === '' || lastName === '' || email === '' || phone === '') {
    result = false;
  }else if(!phone.match(reg) ){
    alert("Please Fill in xxx-xxx-xxxx Format. e.g: 123-123-1234");
  } else if(password.length < 8 ){
    alert("Password Must Be 8 Characters Long");
    return false;
  } else {
    result = true;
  }

  return result;
}

UI.prototype.showFeedback = function (text, type) {

  const feedback = document.querySelector('.drink-form__feedback');

  if (type === 'success') {
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  }
  else if (type === 'error') {
    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
  }

}

//  Remove Alert
UI.prototype.removeAlert = function (type) {

  setTimeout(function () {
    document.querySelector('.drink-form__feedback').classList.remove(type)
  }, 3000)

}

// Add Customer
UI.prototype.addCustomer = function (customer) {

  const images = [1, 2, 3, 4, 5];
  let random = Math.ceil(Math.random() * images.length);

  const div = document.createElement('div');

  div.classList.add('person');
  div.innerHTML = `<img src="img/person-img-${random}.jpg" alt="" class="person__thumbnail">
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__lastname">${customer.lastName}</h4>`

  document.querySelector('.drink-card__list').appendChild(div)

}

// Clear Fields
UI.prototype.clearFields = function () {
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
  document.querySelector('.input-phone').value = '';
  document.querySelector('.input-pass').value = '';
}


// Show Modal
UI.prototype.showModal = function () {
  event.preventDefault();

  if (event.target.parentElement.classList.contains('work-item__icon')) {
    const id = event.target.parentElement.dataset.id;
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item');

    modal.classList.add('work-modal--show');
    modalItem.style.backgroundImage = `url(./img/work-item-${id}.jpg)`;
  };
}

// Hide Modal
UI.prototype.closeModal = function () {
  document.querySelector('.work-modal').classList.remove('work-modal--show');
}

// Show Login
UI.prototype.showLogin = function () {
  event.preventDefault();
  const modal = document.querySelector('.work-modal-login');

  if (document.querySelector('.loginPage').classList.contains('work-modal-login')) {
    modal.classList.add('work-modal--show');
  }
}

// Hide Login
UI.prototype.closeLogin = function () {
  event.preventDefault();

  document.querySelector('.work-modal-login').classList.remove('work-modal--show');
}

// Show Info
UI.prototype.showInfo = function () {
  event.preventDefault();

  const textbox = document.querySelector('.text-box');
  const infox = new Array();

  
  infox[1] = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores omnis praesentium at maiores amet illo suscipit animi porro tempora totam.';
  
  textbox.innerHTML = `<p class='information--show'>`+infox[1]+`</p>`;

}


// customer
function Customer(name, lastName, email, phone, password) {
  this.name = name,
  this.lastName = lastName,
  this.email = email;
  this.phone = phone;
  this.password = password;

}

