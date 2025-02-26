fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;

    const navItems = document.querySelectorAll(".nav-item");
    const navIndicator = document.createElement("div");
    navIndicator.classList.add("nav-indicator");
    document.querySelector(".bottom-nav").appendChild(navIndicator);

    function updateIndicator(element) {
      navIndicator.style.width = `${element.offsetWidth}px`;
      navIndicator.style.left = `${element.offsetLeft}px`;
    }

    navItems.forEach(item => {
      if (item.classList.contains("active")) {
        updateIndicator(item);
      }
      
      item.addEventListener("click", function () {
        navItems.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
        updateIndicator(this);
        localStorage.setItem("activeNavItem", this.getAttribute("href"));
      });
    });

    const savedActiveItem = localStorage.getItem("activeNavItem");
    if (savedActiveItem) {
      navItems.forEach(item => {
        if (item.getAttribute("href") === savedActiveItem) {
          item.classList.add("active");
          updateIndicator(item);
        }
      });
    }
  });
