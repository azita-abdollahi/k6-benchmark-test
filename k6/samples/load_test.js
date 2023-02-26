import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = `http://0.0.0.0:3001`;

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5m', target: 200 },
        { duration: '10m', target: 100 },
        { duration: '5m', target: 0 },
      ],
      gracefulRampDown: '0s',
      },
  },
  noConnectionReuse: true,
  discardResponseBodies: true,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    // 70% of req within 1s, 90% of requests must finish within 2s, 95% within 3s, and 99.9% within 4s.
    http_req_duration: ['p(70) < 1000', 'p(90) < 2000', 'p(95) < 3000', 'p(99.9) < 4000'],
   // the rate of successful checks should be higher than 90%
    checks: ['rate>0.9'],
  },
 };

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
  }
