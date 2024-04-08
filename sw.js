const cacheName = "caches-v0.9.8";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(["./", "./index.html", "./icon.png"]))
  )
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) return r;
      return fetch(e.request).then(response => {
        // only cache css & js
        if (/^http.+(\.css|\.js)$/.test(e.request.url) && !/(\/env\.js)$/.test(e.request.url) && response.ok) {
          const cloned = response.clone();
          caches.open(cacheName).then(cache => {
            cache.put(e.request, cloned);
          })
        };
        return response;
      })
    })
  )
});
// انتظر حتى يتم تحميل المحتوى
document.addEventListener("DOMContentLoaded", function() {
    // اعرض الإشعار
    displayNotification();
});

// تابع لعرض الإشعار
function displayNotification() {
    var notification = document.getElementById("notification");
    var closeBtn = document.getElementById("closeBtn");

    // قم بإظهار الإشعار
    notification.style.display = "block";

    // اضف حدث للزر لإخفاء الإشعار
    closeBtn.addEventListener("click", function() {
        notification.style.display = "none";
    });
}
