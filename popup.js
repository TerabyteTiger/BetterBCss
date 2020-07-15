function start() {
  document
    .getElementById("saveURL42980")
    .addEventListener("click", function () {
      chrome.storage.local.set({
        bgImage: document.getElementById("URL").value,
      });
      document.getElementById("message").innerHTML =
        "Saved! Refresh to see your changes!";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  start();
});
