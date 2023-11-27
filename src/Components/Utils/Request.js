async function queryPanel(data) {
  const response = await fetch(
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        Accept: "image/png",
        Authorization:
          "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.blob();
}

export async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateComicStrip(panelTexts) {
  try {
    const panelPromises = panelTexts.map((panelText) =>
      queryPanel({ inputs: panelText })
    );

    const panelImages = await Promise.all(panelPromises);

    for (let i = 0; i < panelImages.length; i++) {
      const base64Image = await blobToBase64(panelImages[i]);
      sessionStorage.setItem(`comicStripImage${i}`, base64Image);
    }

    return panelImages.length;
  } catch (error) {
    console.error("Error generating comic strip:", error);
  }
}
