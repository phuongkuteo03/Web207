window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("mainNav").style.padding = "9px 9px";
    document.getElementById("logo").style.fontSize = "20px";
  } else {
    document.getElementById("mainNav").style.padding = "30px 10px";
    document.getElementById("logo").style.fontSize = "28px";
  }
}
