// screenshotUtils.js
import html2canvas from "html2canvas";

export const copyScreenshotToClipboard = (className) => {
  const elementRef = document.querySelector(`.${className}`);

  if (!elementRef) {
    console.error(`Element with class name "${className}" not found.`);
    return;
  }

  html2canvas(elementRef).then((canvas) => {
    const screenshot = canvas.toDataURL();

    const blob = dataURItoBlob(screenshot);
    const clipboardData = new ClipboardItem({ "image/png": blob });

    navigator.clipboard
      .write([clipboardData])
      .then(() => {
        console.log("Screenshot copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  });
};

// Helper function to convert data URI to Blob
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

export default copyScreenshotToClipboard;
