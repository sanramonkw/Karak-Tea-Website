/**
 * Adds origin to the YouTube embed URL when served over http(s) (fixes Error 153).
 * Video always plays inline on this page — no redirect to youtube.com.
 */
(function () {
  const iframe = document.querySelector(".prep-youtube");
  if (!iframe) return;

  const videoId = "0DdPepASq1w";
  const params = new URLSearchParams({ si: "CeroOMH-d9klONzD" });

  if (location.origin && location.protocol !== "file:") {
    params.set("origin", location.origin);
  }

  iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
})();
