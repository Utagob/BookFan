$(document).ready(function () {
  const $this = $('.scrollmenu');
  const $items = $this.find('div');
  const itemWidth = $items.outerWidth(true);
  const scrollCount = 2;
  

  function moveRight() {
    $this.stop().animate({
      scrollLeft: $this.scrollLeft() + itemWidth * scrollCount
    }, 300);
  }

  function moveLeft() {
    $this.stop().animate({
      scrollLeft: $this.scrollLeft() - itemWidth * scrollCount
    }, 300);
  }

  $("body").keydown(function (e) {
    if ((e.keyCode || e.which) == 37) moveLeft();
    if ((e.keyCode || e.which) == 39) moveRight();
  });

  $('.lNav').click(moveLeft);
  $('.rNav').click(moveRight);
});

document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cartList");
  const cartButton = document.getElementById("cartButton");
  const cartBox = document.getElementById("cartBox");

  // Create a single total price element
  const totalPriceElement = document.createElement("div");
  totalPriceElement.id = "totalPrice";
  totalPriceElement.style.marginTop = "10px";
  totalPriceElement.style.fontWeight = "bold";
  totalPriceElement.textContent = "Total: 0 MDL";
  cartBox.appendChild(totalPriceElement);

  if (!cartButton || !cartBox) {
    console.error("Cart button or cart box element not found in the DOM.");
    return;
  }

  // Toggle cart visibility
  cartButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    cartBox.classList.toggle("hidden");
    console.log("Cart button clicked"); // Debugging log
  });

  document.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && event.target.closest(".book")) {
      const bookElement = event.target.closest(".book");
      const bookName = bookElement.querySelector(".name").textContent;
      const bookAuthor = bookElement.querySelector(".author").textContent;
      const bookPrice = parseFloat(event.target.textContent.replace(" MDL", ""));
      const bookImageSrc = bookElement.querySelector("img").src;

      // Check if the book is already in the cart
      const existingItem = Array.from(cartList.children).find((item) => {
        const nameElement = item.querySelector(".details .name");
        return nameElement && nameElement.textContent === bookName;
      });

      if (existingItem) {
        alert("This book is already in the cart.");
        return;
      }

      // Create a new cart item
      const listItem = document.createElement("li");
      listItem.classList.add("cart-item");

      // Left section: Remove button and price
      const leftDiv = document.createElement("div");
      leftDiv.classList.add("left");
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-btn");

      const priceSpan = document.createElement("span");
      priceSpan.textContent = `${bookPrice} MDL`;
      priceSpan.style.marginRight = "10px"; // Add spacing between price and icon
      removeButton.appendChild(priceSpan);

      const removeIcon = document.createElement("i");
      removeIcon.classList.add("fa-solid", "fa-xmark");
      removeButton.appendChild(removeIcon);
      leftDiv.appendChild(removeButton);

      // Right section: Image, name, and author
      const rightDiv = document.createElement("div");
      rightDiv.classList.add("right");
      const bookImage = document.createElement("img");
      bookImage.src = bookImageSrc;
      bookImage.alt = bookName;
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("details");
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("name");
      nameSpan.textContent = bookName;
      const authorSpan = document.createElement("span");
      authorSpan.classList.add("author");
      authorSpan.textContent = bookAuthor;
      detailsDiv.appendChild(nameSpan);
      detailsDiv.appendChild(authorSpan);
      rightDiv.appendChild(bookImage);
      rightDiv.appendChild(detailsDiv);

      // Append left and right sections to the list item
      listItem.appendChild(leftDiv);
      listItem.appendChild(rightDiv);

      // Add the list item to the cart
      cartList.appendChild(listItem);

      // Add event listener to the remove button
      removeButton.addEventListener("click", () => {
        cartList.removeChild(listItem);
        updateCartMessage();
        updateTotalPrice();
      });

      // Update the cart message and total price
      updateCartMessage();
      updateTotalPrice();
    }
  });

  // Function to update the cart message
  function updateCartMessage() {
    if (cartList.children.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "Cart is empty";
      emptyMessage.id = "emptyMessage";
      cartList.appendChild(emptyMessage);
    } else {
      const emptyMessage = document.getElementById("emptyMessage");
      if (emptyMessage) {
        cartList.removeChild(emptyMessage);
      }
    }
  }

  // Function to update the total price
  function updateTotalPrice() {
    let total = 0;
    const cartItems = cartList.querySelectorAll(".cart-item");
    cartItems.forEach((item) => {
      const priceText = item.querySelector(".left span").textContent;
      const price = parseFloat(priceText.replace(" MDL", ""));
      total += price;
    });
    totalPriceElement.textContent = `Total: ${total.toFixed(2)} MDL`;
  }

  // Initialize the cart with the empty message
  updateCartMessage();
});

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".categories li a");
  const books = document.querySelectorAll(".book");
  
  categories.forEach((categoryLink) => {
    categoryLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      const category = event.target.textContent.toLowerCase(); // Get category name
      filterBooks(category); // Filter books
    });
  });

  function filterBooks(category) {
    books.forEach((book) => {
      if (book.dataset.category === category || category === "all") {
        book.style.display = "block"; // Show books in the selected category
      } else {
        book.style.display = "none"; // Hide books not in the selected category
      }
    });
  }

  // Show all books by default
  filterBooks("all");
});