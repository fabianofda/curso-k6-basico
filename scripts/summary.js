import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  // Define um valor padrão como 'TEST_DEFAULT' caso TEST_NAME não seja fornecido
  const testName = __ENV.TEST_NAME; // Nome do teste em maiúsculas

  const now = new Date();

  // Formatar data e hora no padrão DD-MM-YYYY_HH-MM-SS
  const timestamp = `${now.getDate().toString().padStart(2, "0")}-${(
    now.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${now.getFullYear()}_${now
    .getHours()
    .toString()
    .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`; // Exemplo: 23-04-2025_15-45-32

  const dirPath = "reports"; // Caminho para a pasta onde os relatórios serão salvos
  const filePath = `${dirPath}/${testName}-${timestamp}.html`; // Caminho completo do relatório com timestamp

  const options = {
    title: `Test Summary - ${testName}`, // Título personalizado do relatório
  };

  return {
    [filePath]: htmlReport(data, options), // Relatório gerado com título e caminho personalizados
  };
}
