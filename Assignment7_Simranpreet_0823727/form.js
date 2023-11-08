document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    // Form validation using HTML5 attributes
    var schoolForm = document.getElementById('schoolForm');
    var personalForm = document.getElementById('personalForm');
    var paymentForm = document.getElementById('paymentForm');
  
    schoolForm.addEventListener('submit', function (event) {
      if (!schoolForm.checkValidity()) {
        event.preventDefault();
        handleInvalidForm(schoolForm);
      }
    });
  
    personalForm.addEventListener('submit', function (event) {
      if (!personalForm.checkValidity()) {
        event.preventDefault();
        handleInvalidForm(personalForm);
      }
    });
  
    paymentForm.addEventListener('submit', function (event) {
      var constraints = {
        creditCardNumber: {
          presence: true,
          format: {
            pattern: '[0-9]{10}',
            message: 'must be a 10-digit number'
          }
        },
        expirationDate: {
          presence: true,
          format: {
            pattern: '(0[1-9]|1[0-2])\/[0-9]{4}',
            message: 'must be in MM/YYYY format'
          }
        },
        cvv: {
          presence: true,
          format: {
            pattern: '[0-9]{3}',
            message: 'must be a 3-digit number'
          }
        }
      };
  
      var validationResult = validate({
        creditCardNumber: paymentForm.creditCardNumber.value,
        expirationDate: paymentForm.expirationDate.value,
        cvv: paymentForm.cvv.value
      }, constraints);
  
      if (validationResult) {
        event.preventDefault();
        alert(validationResult.join('\n'));
      }
    });
  
    function handleInvalidForm(form) {
      var invalidFields = form.querySelectorAll(':invalid');
      invalidFields.forEach(function (field) {
        field.setCustomValidity('');
        if (!field.validity.valid) {
          if (field.name === 'schoolName') {
            field.setCustomValidity('Please enter the school name.');
          } else if (field.name === 'joiningDate') {
            field.setCustomValidity('Please enter a valid joining date.');
          } else if (field.name === 'email') {
            field.setCustomValidity('Please enter a valid email address.');
          } else if (field.name === 'phoneNumber') {
            field.setCustomValidity('Please enter a valid phone number.');
          } else if (field.name === 'zipCode') {
            field.setCustomValidity('Please enter a valid Canadian zip code (A1A 1A1 format).');
          } else if (field.name === 'creditCardNumber') {
            field.setCustomValidity('Please enter a 10-digit credit card number.');
          } else if (field.name === 'expirationDate') {
            field.setCustomValidity('Please enter a valid expiration date (MM/YYYY format).');
          } else if (field.name === 'cvv') {
            field.setCustomValidity('Please enter a 3-digit CVV number.');
          }
        }
      });
    }
  });
  