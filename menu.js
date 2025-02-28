fetch("navbar.html")
  .then(response => {
    if (!response.ok) throw new Error("Lỗi tải navbar.html");
    return response.text();
  })
  .then(data => {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (!navbarPlaceholder) throw new Error("Không tìm thấy #navbar-placeholder");

    navbarPlaceholder.innerHTML = data;

    const navItems = document.querySelectorAll(".nav-item");
    const bottomNav = document.querySelector(".bottom-nav");
    if (!bottomNav) return;

    // Tạo nav indicator nếu chưa có
    let navIndicator = document.querySelector(".nav-indicator");
    if (!navIndicator) {
      navIndicator = document.createElement("div");
      navIndicator.classList.add("nav-indicator");
      bottomNav.appendChild(navIndicator);
    }

    function updateIndicator(element) {
      requestAnimationFrame(() => {
        navIndicator.style.width = `${element.offsetWidth}px`;
        navIndicator.style.left = `${element.offsetLeft}px`;
      });
    }

    navItems.forEach(item => {
      if (item.classList.contains("active")) updateIndicator(item);

      item.addEventListener("click", function () {
        navItems.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
        updateIndicator(this);
        localStorage.setItem("activeNavItem", this.getAttribute("href"));
      });
    });

    // Giữ trạng thái active sau khi reload
    const savedActiveItem = localStorage.getItem("activeNavItem");
    if (savedActiveItem) {
      navItems.forEach(item => {
        if (item.getAttribute("href") === savedActiveItem) {
          item.classList.add("active");
          updateIndicator(item);
        }
      });
    }

    // 🎯 **Thêm chức năng kéo menu trên mobile & desktop**
    let isDragging = false, startX, scrollLeft;

    function startDrag(e) {
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX;
      scrollLeft = bottomNav.scrollLeft;
    }

    function stopDrag() {
      isDragging = false;
    }

    function onDrag(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      const walk = (x - startX) * 2; // Tăng tốc độ kéo
      bottomNav.scrollLeft = scrollLeft - walk;
    }

    bottomNav.addEventListener("mousedown", startDrag);
    bottomNav.addEventListener("mouseleave", stopDrag);
    bottomNav.addEventListener("mouseup", stopDrag);
    bottomNav.addEventListener("mousemove", onDrag);
    bottomNav.addEventListener("touchstart", startDrag);
    bottomNav.addEventListener("touchend", stopDrag);
    bottomNav.addEventListener("touchmove", onDrag);
  })
  .catch(error => console.error("🚨 Lỗi menu.js:", error));
