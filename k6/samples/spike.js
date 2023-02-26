import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = `http://0.0.0.0:3001`;

export let options={
stages: [
    { duration: "10s", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "10s", target: 200 },
    { duration: "3m", target: 200 },
    { duration: "10s", target: 100 },
    { duration: "3m", target: 100 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<250"],
  },
  noConnectionReuse: true,
  discardResponseBodies: true,
}
export default function () {
    const res = http.get(`${BASE_URL}/`);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
    }

