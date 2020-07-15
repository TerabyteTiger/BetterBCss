// Config a css link element
const css = document.createElement("link");
css.type = "text/css";
css.rel = "stylesheet";
css.href = chrome.runtime.getURL("/iframeStyles.css");
const css2 = document.createElement("style");

try {
  chrome.storage.local.get(["bgImage"], function (result) {
    console.log(result);
    css2.innerHTML = `
main > div.ms-nav-layout-gutter-right:last-child,
main > div.ms-nav-layout-gutter-left:first-child {
  background: url(${result.bgImage});
  background-repeat: repeat;
  background-size: contain;
}
`;

    result;
  });
} catch (error) {
  css2.innerHTML = `
main > div.ms-nav-layout-gutter-right:last-child,
main > div.ms-nav-layout-gutter-left:first-child {
  background: url("https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._AC_SL1000_.jpg");
  background-repeat: repeat;
  background-size: contain;
}
`;
}

// css2.innerHTML = `
// main > div.ms-nav-layout-gutter-right:last-child,
// main > div.ms-nav-layout-gutter-left:first-child {
//   background: url(${bgImage});
//   background-repeat: repeat;
//   background-size: contain;
// }
// `;

window.onload = setTimeout(async function run() {
  let iframeArray = document.querySelectorAll("iframe");

  try {
    for (frame in iframeArray) {
      if (frame < iframeArray.length) {
        if (iframeArray[frame].contentDocument.body.innerHTML != "") {
          iframeArray[frame].contentDocument.head.appendChild(css);
          iframeArray[frame].contentDocument.head.appendChild(css2);
          // console.log(iframeArray[frame].contentDocument.head.innerHTML);
          // If you don't return something, the function will keep running and cause the page to infini-reload
          return true;
        } else {
          setTimeout(run, 2000);
        }
      }
    }
  } catch (err) {
    console.log(err);
    setTimeout(run, 1000);
  }
}, 4000);

// Dialog.js
