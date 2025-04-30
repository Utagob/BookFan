document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cartList");
  const cartButton = document.getElementById("cartButton");
  const cartBox = document.getElementById("cartBox");

  const totalPriceElement = document.createElement("div");
  totalPriceElement.id = "totalPrice";
  totalPriceElement.style.marginTop = "10px";
  totalPriceElement.style.fontWeight = "bold";
  totalPriceElement.textContent = "Total: 0 MDL";
  cartBox.appendChild(totalPriceElement);

  cartButton.addEventListener("click", (event) => {
    event.preventDefault();
    cartBox.classList.toggle("hidden");
  });
});
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && event.target.closest(".book")) {
      const bookElement = event.target.closest(".book");
      const bookName = bookElement.querySelector(".name").textContent;
      const bookAuthor = bookElement.querySelector(".author").textContent;
      const bookPrice = parseFloat(event.target.textContent.replace(" MDL", ""));
      const bookImageSrc = bookElement.querySelector("img").src;

      const existingItem = Array.from(cartList.children).find((item) => {
        const nameElement = item.querySelector(".details .name");
        return nameElement && nameElement.textContent === bookName;
      });

      if (existingItem) {
        alert("Cartea data este deja selectata.");
        return;
      }

      const listItem = document.createElement("li");
      listItem.classList.add("cart-item");

      const leftDiv = document.createElement("div");
      leftDiv.classList.add("left");
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-btn");

      const priceSpan = document.createElement("span");
      priceSpan.textContent = `${bookPrice} MDL`;
      priceSpan.style.marginRight = "10px"; 
      removeButton.appendChild(priceSpan);

      const removeIcon = document.createElement("i");
      removeIcon.classList.add("fa-solid", "fa-xmark");
      removeButton.appendChild(removeIcon);
      leftDiv.appendChild(removeButton);

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

      listItem.appendChild(leftDiv);
      listItem.appendChild(rightDiv);
      
      cartList.appendChild(listItem);

      removeButton.addEventListener("click", () => {
        cartList.removeChild(listItem);
        updateCartMessage();
        updateTotalPrice();
      });

      updateCartMessage();
      updateTotalPrice();
    }
  

  function updateCartMessage() {
    if (cartList.children.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "Cosul este gol";
      emptyMessage.id = "emptyMessage";
      cartList.appendChild(emptyMessage);
    } else {
      const emptyMessage = document.getElementById("emptyMessage");
      if (emptyMessage) {
        cartList.removeChild(emptyMessage);
      }
    }
  }


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

  updateCartMessage();
});

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".categories li a");
  const books = document.querySelectorAll(".book");
  
  categories.forEach((categoryLink) => {
    categoryLink.addEventListener("click", (event) => {
      event.preventDefault(); 
      const category = event.target.textContent.toLowerCase(); 
      filterBooks(category); 
    });
  });

  function filterBooks(category) {    
    books.forEach((book) => {
      if (book.dataset.category === category || category === "all") {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  }


  filterBooks("all");
});
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const books = document.querySelectorAll(".book");

  searchBar.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    books.forEach((book) => {
      const bookName = book.querySelector(".name").textContent.toLowerCase();
      const bookAuthor = book.querySelector(".author").textContent.toLowerCase();
      if (bookName.includes(query) || bookAuthor.includes(query)) {
        book.style.display = "block"; 
      } else {
        book.style.display = "none"; 
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const toggleModal = document.getElementById("toggleModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalForm = document.getElementById("modalForm");

  loginButton.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", () => {
    loginModal.classList.add("hidden");
  });

  loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      loginModal.classList.add("hidden");
    }
  });

  toggleModal.addEventListener("click", () => {
    if (modalTitle.textContent === "Login") {
      modalTitle.textContent = "Sign Up";
      modalForm.innerHTML = `
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter your username" />
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" />
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" />
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" placeholder="Confirm your password" />
        <button type="submit">Sign Up</button>
      `;
      toggleModal.textContent = "Login";
    } else {
      modalTitle.textContent = "Login";
      modalForm.innerHTML = `
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter your username" />
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" />
        <button type="submit">Submit</button>
      `;
      toggleModal.textContent = "Sign Up";
    }
  });
});