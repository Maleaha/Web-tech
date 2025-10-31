$(function() {
  $('#contactForm').submit(function(e) {
    e.preventDefault();
    
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();

    $(".invalid-feedback").remove();
    $("input, textarea").removeClass("is-invalid");
    var valid = true;

    if (name.trim() === "" || name.length < 3) {
      $("#name").addClass("is-invalid");
      $("#name").after("<div class='invalid-feedback'>Try again (min 3 letters)</div>");
      valid = false;
    }

    if (email.trim() === "" || !email.includes("@")) {
      $("#email").addClass("is-invalid");
      $("#email").after("<div class='invalid-feedback'>Enter a valid email</div>");
      valid = false;
    }

    if (subject.trim() === "") {
      $("#subject").addClass("is-invalid");
      $("#subject").after("<div class='invalid-feedback'>Enter a subject</div>");
      valid = false;
    }

    if (message.trim() === "") {
      $("#message").addClass("is-invalid");
      $("#message").after("<div class='invalid-feedback'>Enter your message</div>");
      valid = false;
    }

    if (valid) {
      alert("Form submitted successfully!");
      $("#contactForm").trigger("reset");
    }
  });
  const toggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

});
