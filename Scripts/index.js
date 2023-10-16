// JavaScript to show the dropdown menu when the Shop link is clicked
document.getElementById("shopDropdown").addEventListener("click", function() {
    document.getElementById("shopDropdownContent").classList.toggle("show");
  });
  
  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function(event) {
    if (!event.target.matches("#shopDropdown")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
  });
  