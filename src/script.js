
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/yG6h-Pef5/";


let model;

const statusText = document.getElementById("status");
const predictBtn = document.getElementById("predictBtn");
const uploadInput = document.getElementById("imageUpload");
const imageElement = document.getElementById("preview");
const resultsDiv = document.getElementById("results");

async function loadModel() {
  try {
    statusText.innerText = "Initializing TensorFlow...";
    await tf.ready();   // 🔥 THIS IS THE KEY FIX

    statusText.innerText = "Loading model...";
    model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    statusText.innerText = "Model loaded successfully ✅";
    predictBtn.disabled = false;

    console.log("Model:", model);

  } catch (error) {
    console.error("MODEL LOAD ERROR:", error);
    statusText.innerText = "Error loading model ❌";
  }
}

loadModel();

// Image preview
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  imageElement.src = URL.createObjectURL(file);
  imageElement.style.display = "block";
  resultsDiv.innerHTML = "";
});

// Predict
predictBtn.addEventListener("click", async () => {
  if (!model) return;

  statusText.innerText = "Predicting...";
  const predictions = await model.predict(imageElement);

  predictions.sort((a, b) => b.probability - a.probability);

  const best = predictions[0];
  if (best.probability < 0.6) {
    resultsDiv.innerHTML = "<b>Breed unclear. Try another image.</b>";
    statusText.innerText = "Done";
    return;
  }

  let html = "<h3>Top Predictions</h3>";
  predictions.slice(0, 3).forEach(p => {
    html += `<p>${p.className} — ${(p.probability * 100).toFixed(2)}%</p>`;
  });

  resultsDiv.innerHTML = html;
  statusText.innerText = "Done";
});
function loadImageFromBlob(blob) {
  const url = URL.createObjectURL(blob);
  imageElement.src = url;
  imageElement.style.display = "block";
  resultsDiv.innerHTML = "";

  // Auto-predict once image loads
  imageElement.onload = () => {
    if (model) {
      predictBtn.click();
    }
  };
}
document.addEventListener("paste", (event) => {
  if (!event.clipboardData) return;

  const items = event.clipboardData.items;
  for (let item of items) {
    if (item.type.startsWith("image/")) {
      event.preventDefault(); // stop default paste
      const blob = item.getAsFile();
      loadImageFromBlob(blob);
      break;
    }
  }
});


