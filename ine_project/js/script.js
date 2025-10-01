
  var passToggler = document.getElementById('togglePassword');
  var passInput = document.getElementById('password');
  if(passToggler && passInput){
    passToggler.addEventListener('click', function(){
      var isPassword = passInput.getAttribute('type') === 'password';
      passInput.setAttribute('type', isPassword ? 'text' : 'password');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }