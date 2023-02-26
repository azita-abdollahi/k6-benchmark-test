import http from 'k6/http';
import { check, sleep } from 'k6'

const BASE_URL = `http://0.0.0.0:3001`;

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages:[
        {duration:'2m', target:10},
        {duration:'4m', target:50},//normal request load
        {duration:'4m', target:100},// request load around the breaking point 
        {duration:'4m', target:100},
        {duration:'2m', target:200},// request load beyond the breaking point
        {duration:'4m', target:0},//scale down to 0 requests for recovery stage
    ],
      gracefulRampDown: '0s',
      },
  },
  noConnectionReuse: true,
  discardResponseBodies: true,
   thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(70) < 3000', 'p(90) < 5000', 'p(95) < 7000', 'p(99.9) < 10000'],
   // the rate of successful checks should be higher than 90%
    checks: ['rate>0.9'],
  },
 };

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
  }



