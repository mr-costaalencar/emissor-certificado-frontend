function mostrarBotoesCertificado() {
  const botoes = document.getElementById("acoesCertificado");
  if (botoes) botoes.classList.remove("d-none");
}

function downloadAsImage(elementId) {
  const el = document.getElementById(elementId);
  html2canvas(el).then((canvas) => {
    const link = document.createElement("a");
    link.download = "certificado.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  });
}

async function downloadAsPDF(elementId) {
  const el = document.getElementById(elementId);
  html2canvas(el).then((canvas) => {
    const imgData = canvas.toDataURL("image/jpeg");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("landscape");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("certificado.pdf");
  });
}
