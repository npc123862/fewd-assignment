document.addEventListener('DOMContentLoaded', function() {

  function createCoffeeChart(canvasId, dataValues) {
    const ctx = document.getElementById(canvasId);

    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Aroma', 'Acidity', 'Body', 'Sweetness', 'Aftertaste'],
          datasets: [{
              label: 'Flavor Profile',
              data: dataValues,
              backgroundColor: 'rgba(255, 193, 7, 0.4)',
              borderColor: 'rgba(255, 193, 7, 1)',
              borderWidth: 2,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#FFC107',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            r: {
              angleLines: { color: '#eee' },
              grid: { color: '#eee' },
              pointLabels: {
                  font: { size: 10, weight: 'bold' },
                  color: '#333'
              },
              suggestedMin: 0,
              suggestedMax: 5,
              ticks: { display: false }
            }
          }
        }
      });
    }
  }

  const newsletterModalEl = document.getElementById('newsletterModal');
  if (newsletterModalEl) {
    const newsletterModal = new bootstrap.Modal(newsletterModalEl);
    if(!localStorage.getItem('hasSeenModal')) {
      setTimeout(function() {
          newsletterModal.show();
          localStorage.setItem('hasSeenModal', 'true');
      }, 6000);
    }
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert("Thank you for signing up. Your discount code is: BEAN10");
      const modalInstance = bootstrap.Modal.getInstance(newsletterModalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }

  const toastElement = document.getElementById('discountToast');
  if (toastElement) {
    const toast = new bootstrap.Toast(toastElement, {
        autohide: false
    });

    let hasShown = false;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 800 && !hasShown) {
        toast.show();
        hasShown = true;
      }
    });
  }

  // Coffee Selection Search
  function filterCoffees() {
    const searchTerm = $('.page-search-input').val() ? $('.page-search-input').val().toLowerCase() : '';
    const maxPrice = parseFloat($('#priceRange').val()) || 25;
    const selectedTypes = $('.filter-type:checked').map(function() { return $(this).val(); }).get();
    const selectedFlavors = $('.filter-flavor:checked').map(function() { return $(this).val(); }).get();

    let itemsFound = 0;

    $('.coffee-item').each(function() {
      const $item = $(this);
      const price = parseFloat($item.data('price'));
      const type = $item.data('type');
      const flavors = $item.data('flavor');
      const searchKeywords = $item.attr('data-search').toLowerCase() + " " + $item.find('.coffee-title').text().toLowerCase();
      const matchesSearch = searchKeywords.includes(searchTerm);
      const matchesPrice = price <= maxPrice;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(type);
      const matchesFlavor = selectedFlavors.length === 0 || selectedFlavors.some(f => flavors.includes(f));

      if (matchesSearch && matchesPrice && matchesType && matchesFlavor) {
        $item.fadeIn('fast');
        itemsFound++;
      } else {
        $item.hide();
      }
    });

    if (itemsFound === 0) {
      $('#noResultsMsg').fadeIn('fast');
    } else {
      $('#noResultsMsg').hide();
    }
  }

  $('.page-search-input').on('keyup', filterCoffees);
  $('.filter-type, .filter-flavor').on('change', filterCoffees);

  $('#priceRange').on('input', function() {
    $('#priceDisplay').text('€' + parseFloat($(this).val()).toFixed(2));
    filterCoffees();
  });

  if (typeof createCoffeeChart === 'function') {
    createCoffeeChart('coffeeChart1', [5, 4, 2, 4, 5]); // Ethiopian
    createCoffeeChart('coffeeChart2', [4, 3, 3, 4, 4]); // Colombian
    createCoffeeChart('coffeeChart3', [3, 1, 5, 2, 4]); // Sumatran
    createCoffeeChart('coffeeChart4', [5, 5, 3, 4, 3]); // Kenyan
    createCoffeeChart('coffeeChart5', [3, 2, 4, 4, 3]); // Swiss Water Decaf
    createCoffeeChart('coffeeChart6', [4, 3, 4, 5, 4]); // House Blend
    createCoffeeChart('coffeeChart7', [4, 3, 4, 3, 4]); // Guatemala
    createCoffeeChart('coffeeChart8', [4, 4, 3, 5, 4]); // Costa Rica

    createCoffeeChart('catChart1', [5, 4, 2, 4, 5]); // Ethiopian
    createCoffeeChart('catChart2', [4, 3, 3, 4, 4]); // Colombian
    createCoffeeChart('catChart3', [3, 1, 5, 2, 4]); // Sumatran
    createCoffeeChart('catChart4', [5, 5, 3, 4, 3]); // Kenyan
    createCoffeeChart('catChart5', [3, 2, 4, 4, 3]); // Swiss Water Decaf
    createCoffeeChart('catChart6', [4, 3, 4, 5, 4]); // House Blend
    createCoffeeChart('catChart7', [4, 3, 4, 3, 4]); // Guatemala
    createCoffeeChart('catChart8', [4, 4, 3, 5, 4]); // Costa Rica
  }

  const $randomCards = $('.random-coffee-card');
    if ($randomCards.length > 0) {
      const shuffledCards = $randomCards.toArray().sort(function() {
          return 0.5 - Math.random();
      });

      $(shuffledCards).slice(0, 4).removeClass('d-none');
    }

  // Equipment Page Search Filter
  $('.equipment-search-input').on('keyup', function() {
    var searchTerm = $(this).val().toLowerCase();
    var matchesFound = 0;

    $('.equipment-item').each(function() {
      var itemKeywords = $(this).attr('data-search').toLowerCase();

      if (itemKeywords.indexOf(searchTerm) > -1) {
        $(this).fadeIn(200);
        matchesFound++;
      } else {
        $(this).hide();
      }
    });

    if (matchesFound === 0) {
      $('#noEquipmentMsg').fadeIn(200);
    } else {
      $('#noEquipmentMsg').hide();
    }
  });

  // --- Events Page Search Filter ---
  $('.event-search-input').on('keyup', function() {
    var searchTerm = $(this).val().toLowerCase();
    var matchesFound = 0;

    $('.event-item').each(function() {
      var itemKeywords = $(this).attr('data-search').toLowerCase();
      var title = $(this).find('.card-title').text().toLowerCase();

      if (itemKeywords.indexOf(searchTerm) > -1 || title.indexOf(searchTerm) > -1) {
          $(this).fadeIn(200);
          matchesFound++;
      } else {
          $(this).hide();
      }
    });

    if (matchesFound === 0) {
      $('#noEventsMsg').fadeIn(200);
    } else {
      $('#noEventsMsg').hide();
    }
  });

  // --- DYNAMIC CART LOGIC ---
  function syncCartBadge() {
    let cart = JSON.parse(localStorage.getItem('beanBoutiqueCart')) || [];
    let totalItems = 0;

    cart.forEach(function(item) {
      totalItems += item.quantity;
    });

    $('.fa-cart-shopping').siblings('.badge').text(totalItems);
  }

  syncCartBadge();

  $('button:has(.fa-cart-plus)').on('click', function(e) {
    e.preventDefault();
    var $btn = $(this);

    var originalHtml = $btn.html();
    var originalClass = $btn.attr('class');
    $btn.removeClass('btn-warning btn-outline-warning btn-dark text-dark').addClass('btn-success text-white');
    $btn.html('<i class="fa-solid fa-check me-2"></i>Added');
    setTimeout(function() {
      $btn.attr('class', originalClass);
      $btn.html(originalHtml);
    }, 2000);

    var $card = $btn.closest('.card');

    var name = $card.find('.card-title').text().trim();
    var image = $card.find('img').attr('src');
    var desc = $card.find('.badge').first().text() || "Premium Gear";

    var priceText = $card.find('h4, h6').filter(function() { return $(this).text().includes('€'); }).text().trim().replace('€', '');
    var price = parseFloat(priceText);

    let cart = JSON.parse(localStorage.getItem('beanBoutiqueCart')) || [];

    let existingItem = cart.find(function(item) { return item.name === name; });

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: name, price: price, image: image, desc: desc, quantity: 1 });
    }

    localStorage.setItem('beanBoutiqueCart', JSON.stringify(cart));
    syncCartBadge();
  });


  function renderCartPage() {
    const $cartContainer = $('#cartItemsContainer');

    if ($cartContainer.length === 0) return;

    let cart = JSON.parse(localStorage.getItem('beanBoutiqueCart')) || [];
    $cartContainer.empty();
    let subtotal = 0;

    if (cart.length === 0) {
      $cartContainer.html(`
        <div class="text-center py-5 theme-surface rounded shadow-sm border-0 mb-4">
          <i class="fa-solid fa-basket-shopping fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">Your cart is empty</h4>
          <p class="text-muted small">Looks like you haven't added any coffee yet!</p>
          <a href="coffee.html" class="btn btn-warning mt-2 fw-bold">Start Shopping</a>
        </div>
      `);
      $('#cartSubtotal').text('€0.00');
      $('#cartShipping').text('€0.00');
      $('#cartTotal').text('€0.00');
      $('#cartDiscountRow').addClass('d-none');
      $('#cartDiscountAmount').text('-€0.00');
      $('#clearCartBtn').addClass('d-none');
      return;
    }

    cart.forEach(function(item, index) {
      let itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      let itemHtml = `
        <article class="card shadow-sm border-0 mb-3 cart-item" data-index="${index}">
          <div class="card-body p-3 d-flex flex-column flex-sm-row align-items-sm-center">
            <img src="${item.image}" alt="${item.name}" class="cart-thumb me-sm-4 mb-3 mb-sm-0">
            <div class="flex-grow-1">
              <h4 class="h6 fw-bold mb-1">${item.name}</h4>
              <p class="text-muted small mb-2 mb-sm-0">${item.desc}</p>
            </div>
            <div class="d-flex align-items-center mt-2 mt-sm-0">
              <input type="number" class="form-control form-control-sm text-center me-3 quantity-input cart-qty-width" value="${item.quantity}" min="1">
              <span class="fw-bold me-4 cart-price-width">€${itemTotal.toFixed(2)}</span>
              <button class="btn btn-sm btn-outline-danger remove-item" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        </article>
      `;
      $cartContainer.append(itemHtml);
    });

    let shipping = subtotal >= 50 ? 0.00 : 4.99;

    let discountAmount = 0;
    let activePromo = sessionStorage.getItem('beanBoutiqueActivePromo');

    if (activePromo === 'SUB15') {
      discountAmount = subtotal * 0.15;
      $('#cartDiscountRow').removeClass('d-none');
      $('#cartDiscountRow span:first-child').text('Subscription Discount (15%)');
      $('#cartDiscountAmount').text('-€' + discountAmount.toFixed(2));
    } else if (activePromo === 'BEAN10') {
      discountAmount = subtotal * 0.10;
      $('#cartDiscountRow').removeClass('d-none');
      $('#cartDiscountRow span:first-child').text('Welcome Discount (10%)');
      $('#cartDiscountAmount').text('-€' + discountAmount.toFixed(2));
    } else {
      $('#cartDiscountRow').addClass('d-none');
    }

    let total = subtotal - discountAmount + shipping;

    $('#cartSubtotal').text('€' + subtotal.toFixed(2));
    $('#cartShipping').text(shipping === 0 ? 'Free (Over €50)' : '€' + shipping.toFixed(2));
    $('#cartTotal').text('€' + total.toFixed(2));
    $('#clearCartBtn').removeClass('d-none');

    $('.remove-item').on('click', function() {
      let idx = $(this).closest('.cart-item').data('index');
      cart.splice(idx, 1);
      localStorage.setItem('beanBoutiqueCart', JSON.stringify(cart));
      renderCartPage();
      syncCartBadge();
    });

    $('.quantity-input').on('change', function() {
      let idx = $(this).closest('.cart-item').data('index');
      let newQty = parseInt($(this).val());
      if (newQty > 0) {
        cart[idx].quantity = newQty;
        localStorage.setItem('beanBoutiqueCart', JSON.stringify(cart));
        renderCartPage();
        syncCartBadge();
      }
    });
  }

  renderCartPage();


  // --- PROMO CODE ---
  $('#applyPromoBtn').on('click', function() {
    const code = $('#promoCodeInput').val().trim().toUpperCase();

    if (code === 'SUB15') {
      if (localStorage.getItem('beanBoutiquePromoUsed') === 'true') {
        alert('Sorry, this code is only valid for your first subscription.');
      } else {
        sessionStorage.setItem('beanBoutiqueActivePromo', 'SUB15');
        alert('Success! 15% subscription discount applied.');
        renderCartPage();
      }
    } else if (code === 'BEAN10') {
      if (localStorage.getItem('beanBoutiqueWelcomeUsed') === 'true') {
        alert('Sorry, this welcome code has already been used.');
      } else {
        sessionStorage.setItem('beanBoutiqueActivePromo', 'BEAN10');
        alert('Success! 10% welcome discount applied.');
        renderCartPage();
      }
    } else if (code === '') {
      alert('Please enter a promo code.');
    } else {
      alert('Invalid promo code. Please try again.');
    }
    $('#promoCodeInput').val('');
  });


  $('#checkoutBtn').on('click', function(e) {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem('beanBoutiqueCart')) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    $('#authModal').modal('show');
  });


  $('#clearCartBtn').on('click', function() {
    if(confirm("Are you sure you want to empty your cart?")) {
      localStorage.removeItem('beanBoutiqueCart');
      renderCartPage();
      syncCartBadge();
    }
  });

  // --- Contact Form Dynamic CAPTCHA ---
  const $contactForm = $('#contactForm');

  if ($contactForm.length > 0) {
    let correctAnswer = 0;

    function generateCaptcha() {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;

      correctAnswer = num1 + num2;

      $('#mathQuestion').text(num1 + ' + ' + num2);
    }

    generateCaptcha();

    $contactForm.on('submit', function(e) {
      e.preventDefault();

      const userAnswer = parseInt($('#captchaInput').val());

      if (userAnswer === correctAnswer) {
        alert("Message sent successfully! We will get back to you soon.");
        this.reset();
        generateCaptcha();
      } else {
        alert("Incorrect math answer. Please try again to prove you are human!");
        $('#captchaInput').val('').focus();
      }
    });
  }

  $(window).on('load', function() {
    setTimeout(function() {
      const $preloader = $('#preloader-wrapper');

        function focusSearchBar() {
          if ($(window).width() > 991) {
            $('#mainSearchInput').focus();
          }
        }

        if ($preloader.length > 0) {
          $preloader.fadeOut(500, function() {
            $(this).remove();
            focusSearchBar();
          });
        } else {
          focusSearchBar();
        }
      }, 250);
  });

  // --- EVENT REGISTRATION ---
  const $eventRegistrationForm = $('#eventRegistrationForm');

  if ($eventRegistrationForm.length > 0) {
    $eventRegistrationForm.on('submit', function(e) {
      e.preventDefault();

      const firstName = $('#firstName').val();
      const lastName = $('#lastName').val();
      const userEmail = $('#emailAddress').val();
      const selectedEvent = $('#eventSelect option:selected').text();
      const ticketCount = $('#ticketCount').val();

      const emailSubject = encodeURIComponent(`Event Registration: ${selectedEvent}`);
      const emailBody = encodeURIComponent(`Hello Bean Boutique,\n\nI would like to register for an event.\n\nName: ${firstName} ${lastName}\nEmail: ${userEmail}\nEvent: ${selectedEvent}\nTickets: ${ticketCount}\n\nThank you!`);

      window.location.href = `mailto:hello@beanboutique.com?subject=${emailSubject}&body=${emailBody}`;

      alert(`Opening your email client to complete registration for: ${selectedEvent}.`);
      this.reset();
    });
  }


  // --- ACCESSIBILITY PANEL ---
  const $a11yBtn = $('#a11y-btn');
  const $a11yPanel = $('#a11y-panel');
  const $closeA11yBtn = $('#close-a11y-panel');

  $a11yBtn.on('click', function() {
      $a11yPanel.toggleClass('d-none');
  });

  $closeA11yBtn.on('click', function() {
      $a11yPanel.addClass('d-none');
  });

  const a11ySettings = {
      theme: localStorage.getItem('beanBoutiqueTheme') === 'dark',
      text: localStorage.getItem('beanBoutiqueText') === 'true',
      links: localStorage.getItem('beanBoutiqueLinks') === 'true'
  };

  if (a11ySettings.theme) {
      $('body').attr('data-theme', 'dark');
      $('#themeSwitch').prop('checked', true);
  }
  if (a11ySettings.links) {
      $('body').addClass('highlight-links');
      $('#highlightLinks').prop('checked', true);
  }

  $('#themeSwitch').on('change', function() {
      if ($(this).is(':checked')) {
          $('body').attr('data-theme', 'dark');
          localStorage.setItem('beanBoutiqueTheme', 'dark');
      } else {
          $('body').removeAttr('data-theme');
          localStorage.setItem('beanBoutiqueTheme', 'light');
      }
  });

  let currentTextSize = parseInt(localStorage.getItem('beanBoutiqueTextSize')) || 100;

  function applyTextSize() {
      $('html').css('font-size', currentTextSize + '%');
      $('#text-size-display').text(currentTextSize + '%');
  }

  applyTextSize();

  $('#btn-text-increase').on('click', function() {
      if (currentTextSize < 150) {
          currentTextSize += 10;
          localStorage.setItem('beanBoutiqueTextSize', currentTextSize);
          applyTextSize();
      }
  });

  $('#btn-text-decrease').on('click', function() {
      if (currentTextSize > 80) {
          currentTextSize -= 10;
          localStorage.setItem('beanBoutiqueTextSize', currentTextSize);
          applyTextSize();
      }
  });

  $('#highlightLinks').on('change', function() {
      if ($(this).is(':checked')) {
          $('body').addClass('highlight-links');
          localStorage.setItem('beanBoutiqueLinks', 'true');
      } else {
          $('body').removeClass('highlight-links');
          localStorage.setItem('beanBoutiqueLinks', 'false');
      }
  });

  // --- AUTHENTICATION MODAL ---
  const $authModal = $('#authModal');

  if ($authModal.length > 0) {
    $('#loginBtn').on('click', function() {
      alert('Redirecting to the Login page...');
      $authModal.modal('hide');
    });

    $('#registerBtn').on('click', function() {
      alert('Redirecting to the Account Registration page...');
      $authModal.modal('hide');
    });

    $('#guestBtn').on('click', function() {
      $('#authModal').modal('hide');

      const activePromo = sessionStorage.getItem('beanBoutiqueActivePromo');

      if (activePromo === 'SUB15') {
        localStorage.setItem('beanBoutiquePromoUsed', 'true');
      } else if (activePromo === 'BEAN10') {
        localStorage.setItem('beanBoutiqueWelcomeUsed', 'true');
      }

      sessionStorage.removeItem('beanBoutiqueActivePromo');

      alert('Thank you for your purchase! Your order is being processed.');

      localStorage.removeItem('beanBoutiqueCart');

      if (typeof renderCartPage === 'function') {
        renderCartPage();
        syncCartBadge();
      }
    });
  }

  // --- GLOBAL ACCOUNT MODAL ---
  const $accountModal = $('#accountModal');

  if ($accountModal.length > 0) {
    $('#navLoginBtn').on('click', function() {
      alert('Redirecting to the secure Login portal...');
      $accountModal.modal('hide');
    });

    $('#navRegisterBtn').on('click', function() {
      alert('Redirecting to the Account Creation page...');
      $accountModal.modal('hide');
    });
  }
});
