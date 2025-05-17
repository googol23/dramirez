// scripts.js

window.MathJax = {
    tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
};


// Hide "Show more" buttons and limit Conference entries before PDF export
function prepareContentForPDF() {
  // Hide all <details> elements
  document.querySelectorAll("details").forEach(d => d.remove());

  // Keep only the most recent 5 Conference entries
  const confList = document.querySelectorAll("section h2")
    .forEach(h2 => {
      if (h2.textContent.includes("Conference Participation")) {
        const list = h2.nextElementSibling;
        if (list && list.tagName === "UL") {
          const items = list.querySelectorAll("li");
          items.forEach((item, i) => {
            if (i >= 5) item.remove();
          });
        }
      }
    });
}

// PDF export using html2pdf
function exportToPDF() {
  prepareContentForPDF();

  const element = document.querySelector("main");
  const opt = {
  margin:       0.5,
  filename:     'Dario_Ramirez_CV.pdf',
  html2canvas:  { scale: 1, useCORS: true, logging: false },
  jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
  pagebreak:    { mode: ['css', 'legacy'] }
};

  html2pdf().set(opt).from(element).save();
}

// Attach button listener
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("save-pdf-btn");
  if (btn) btn.addEventListener("click", exportToPDF);
});
