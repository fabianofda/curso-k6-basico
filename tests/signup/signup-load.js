import http from "k6/http";
import { check, sleep } from "k6";
import uuid from "../libs/uuid.js";
import { handleSummary } from "../../scripts/summary.js"; // Importa a função de relatório

export const options = {
  stages: [
    { duration: "30s", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% das req devem responder em até 2s
    http_req_failed: ["rate<0.01"], // 1% de falhas
  },
};

export function loadTest() {
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

  sleep(1);
}

export default function () {
  loadTest();
}

// Exporta a função de relatório para K6
export { handleSummary };
