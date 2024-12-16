document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            loginUser('staff');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            registerUser('staff');
        });
    }

});

function registerUser(userType) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[userType]) {
        users[userType] = [];
    }

    users[userType].push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful.');
    window.location.href = 'index.html';
}

function loginUser(userType) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userList = users[userType] || [];

    const user = userList.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful.');
        if (userType === 'customer') {
            window.location.href = 'customer-dashboard.html';
        } else {
            window.location.href = 'staff-dashboard.html';
        }
    } else {
        alert('Invalid credentials.');
    }
}

// Fetch notifications from the local storage
function getStaffNotifications() {
    return JSON.parse(localStorage.getItem('staffNotifications')) || [];
  }
  
  // Display notifications on the staff page
  function displayNotifications() {
    const notificationsContainer = document.getElementById('personalizedInterface');
    notificationsContainer.innerHTML = '';
    const notifications = getStaffNotifications();
  
    if (notifications.length === 0) {
      const noNotificationMessage = document.createElement('p');
      noNotificationMessage.textContent = 'No new notifications.';
      notificationsContainer.appendChild(noNotificationMessage);
    } else {
      const notificationList = document.createElement('ul');
      notifications.forEach((notification, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${notification}`;
        notificationList.appendChild(listItem);
      });
      notificationsContainer.appendChild(notificationList);
    }
  }
  
  // Fetch orders from the local storage
  function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
  }
  
  // Display orders on the staff page
  function displayOrders() {
    const ordersContainer = document.getElementById('orderManagement');
    ordersContainer.innerHTML = '';
    const orders = getOrders();
  
    if (orders.length === 0) {
      const noOrderMessage = document.createElement('p');
      noOrderMessage.textContent = 'No orders found.';
      ordersContainer.appendChild(noOrderMessage);
    } else {
      const orderList = document.createElement('ul');
      orders.forEach((order, index) => {
        const listItem = document.createElement('li');
        const items = order.items.map(item => `${item.item} (${item.quantity})`).join(', ');
        listItem.innerHTML = `
          <h3>${index + 1}. Order from ${order.customer}</h3>
          <p>Items: ${items}</p>
          <p>Total: $${order.total.toFixed(2)}</p>
        `;
        orderList.appendChild(listItem);
      });
      ordersContainer.appendChild(orderList);
    }
  }
  
  // Fetch reviews from the local storage
  function getReviews() {
    return JSON.parse(localStorage.getItem('reviews')) || [];
  }
  
  // Display reviews on the staff page
  function displayReviews() {
    const reviewsContainer = document.getElementById('customerReviews');
    reviewsContainer.innerHTML = '';
    const reviews = getReviews();
  
    if (reviews.length === 0) {
      const noReviewMessage = document.createElement('p');
      noReviewMessage.textContent = 'No reviews found.';
      reviewsContainer.appendChild(noReviewMessage);
    } else {
      const reviewList = document.createElement('ul');
      reviews.forEach((review, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${index + 1}. Review by ${review.customer}</h3>
          <p>Dish: ${review.dish}</p>
          <p>Rating: ${review.rating}</p>
          <p>Comment: ${review.comment}</p>
        `;
        reviewList.appendChild(listItem);
      });
      reviewsContainer.appendChild(reviewList);
    }
  }
  
  // Fetch inventory data from the local storage (assuming it's stored there)
  function getInventory() {
    return JSON.parse(localStorage.getItem('inventory')) || [];
  }
  
  // Display inventory on the staff page
  function displayInventory() {
    const inventoryContainer = document.getElementById('inventoryManagement');
    inventoryContainer.innerHTML = '';
    const inventory = getInventory();
  
    if (inventory.length === 0) {
      const noInventoryMessage = document.createElement('p');
      noInventoryMessage.textContent = 'No inventory found.';
      inventoryContainer.appendChild(noInventoryMessage);
    } else {
      const inventoryList = document.createElement('ul');
      inventory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${index + 1}. ${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
        `;
        inventoryList.appendChild(listItem);
      });
      inventoryContainer.appendChild(inventoryList);
    }
  }
  
  // Call the display functions when the page loads
  window.addEventListener('load', () => {
    displayNotifications();
    displayOrders();
    displayReviews();
    displayInventory();
  });