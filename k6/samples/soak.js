import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = `http://0.0.0.0:3001`;

export const options = {
  stages: [
    { duration: "5m", target: 200 },
    { duration: "1h40m", target: 100 },
    { duration: "5m", target: 0 },
  ],
  discardResponseBodies: true,
  thresholds: {
    http_req_duration: ["p(99)<250"],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

