import http from "k6/http";
import { check, sleep } from "k6";
import uuid from "../libs/uuid.js";
import { handleSummary } from "../../scripts/summary.js"; // Importa a função de relatório

// Configuração das opções para o teste de stress
export const options = {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "40s", target: 100 },
    { duration: "10s", target: 200 },
    { duration: "40s", target: 200 },
    { duration: "10s", target: 300 },
    { duration: "40s", target: 300 },
    { duration: "10s", target: 400 },
    { duration: "40s", target: 400 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% das req devem responder em até 2s
    http_req_failed: ["rate<0.01"], // No máximo 1% de falhas
  },
};

// Função dedicada para o teste de stress
export function stressTest() {
  const url = "http://localhost:3333/signup";

  const payload = JSON.stringify({
    email: `${uuid.v4().substring(24)}@qa.teste.com.br`,
    password: "pwd123",
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(url, payload, { headers });

  check(res, {
    "status should be 201": (r) => r.status === 201,
  });

  sleep(1); // Atraso entre as requisições para simular comportamento real
}

// Função principal que será executada
export default function () {
  stressTest(); // Chama a função de stress
}
// Exporta a função handleSummary para gerar relatórios
export { handleSummary };
