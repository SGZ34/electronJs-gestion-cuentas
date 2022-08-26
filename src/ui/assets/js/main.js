document.querySelector(".toggle").addEventListener("click", () => {
  document.querySelector(".navigation-app").classList.toggle("active");
  document.querySelector(".main").classList.toggle("active");
  document.querySelector(".title-main-sidebar").classList.toggle("active");
});
