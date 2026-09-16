  



document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("footer nav a");
  const currentURL = window.location.href;

  links.forEach(link => {
    if (currentURL.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });
});


  
/*  const links = document.querySelectorAll("footer nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if(link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
  */
  
  
/**
const links = document.querySelectorAll("footer nav a");
const currentURL = window.location.href;

links.forEach(link => {
  if (currentURL.includes(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});
  **/