🐱 Animal Breed Classifier (TensorFlow.js + Teachable Machine)

A browser-based animal (cat) breed classifier built using Teachable Machine and TensorFlow.js, featuring a batch testing pipeline that evaluates model performance and exports results as a CSV file for analysis.

This project focuses not just on prediction, but on reproducible evaluation, label normalization, and performance analysis.

🚀 Features

Live image classification in the browser

Batch testing of folders/images

Automatic CSV export of predictions

Label normalization to handle truncated class names

Per-image confidence scores

Excel-friendly results for performance analysis

🧠 Tech Stack

Frontend: HTML, CSS, JavaScript

ML Model: Teachable Machine (Image Classification)

Runtime: TensorFlow.js

Evaluation: Custom batch testing pipeline (CSV-based)

📁 Project Structure
.
├── model/
│   ├── model.json
│   └── metadata.json
│
├── src/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── demo/
│   └── demo.gif
│
├── results/
│   └── (CSV results exported here)
│
└── README.md

▶️ How to Run
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/animal-breed-classifier-tmjs.git
cd animal-breed-classifier-tmjs

2. Open in Browser

Simply open:

src/index.html


in any modern browser (Chrome recommended).

No server or installation required.

🧪 Batch Testing Workflow

Click Load Model

Select a folder containing test images

The system:

Runs predictions on all images

Normalizes predicted and true labels

Matches using full label + fallback logic

Exports results as a CSV file

CSV Output Columns
image, true_label, predicted_label, confidence, correct

📊 Model Performance (Current Setup)

Overall Accuracy: ~60% on 10 fine-grained cat breeds

Strong Classes: Abyssinian, Bengal, Bombay, Exotic Shorthair

Weak Classes: American Bobtail, American Shorthair

Interpretation

The model performs well on visually distinct breeds but struggles with morphologically similar shorthair breeds, which is a known limitation when training CNNs with limited datasets.

⚙️ Engineering Highlights

Uses model metadata mapping instead of UI class names to avoid label truncation issues

Normalizes labels into a consistent lowercase_underscore format

Implements fallback prefix-based matching for robustness

Prevents memory leaks by revoking image blob URLs

Produces Excel-safe CSV exports

🎯 Learning Outcomes

Built a complete ML inference + evaluation pipeline in the browser

Understood overfitting and class confusion in fine-grained image classification

Designed a robust label-matching system

Learned to analyze results using per-class accuracy instead of just overall accuracy

📌 Future Improvements

Add data augmentation for visually similar breeds

Increase dataset size for shorthair classes

Generate automatic confusion matrix visualization

Deploy using GitHub Pages

👤 Author

Harshal Lokhande
EXTC Background | Aspiring Software / ML Engineer
