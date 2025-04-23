import http from "k6/http";
import { check, sleep } from "k6";
import uuid from "../libs/uuid.js";
import { handleSummary } from "../../scripts/summary.js"; // Importa a função de relatório

export const options = {
  vus: 1, // Número de usuários virtuais
  duration: "30s", // Duração do teste
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% das req devem responder em até 2s
    http_req_failed: ["rate<0.01"], // No máximo 1% de falhas
  },
};

// Função dedicada para executar o teste de fumaça
export function smokeTest() {
  const url = "http://localhost:3333/signup";

  const payload = JSON.stringify({
    email: `${uuid.v4().substring(24)}@qa.teste.com.br`,
    password: "pwd123",
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(url, payload, { headers });

  // Verifica se a resposta tem status 201
  check(res, {
    "status should be 201": (r) => r.status === 201,
  });

  sleep(1);
}

// Função principal que será executada durante o teste
export default function () {
  smokeTest();
}

// Exporta a função handleSummary para gerar relatórios
export { handleSummary };
