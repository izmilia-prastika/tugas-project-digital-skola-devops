import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 50 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<400'],
        http_req_failed: ['rate<0.01'],
    },
};

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
    const payload = JSON.stringify({ title: 'test', body: 'content' });
    const createRes = http.post(`${BASE}/notes`, payload, {
        headers: { 'Content-Type': 'application/json' }
    });
    check(createRes, { 'status 201': (r) => r.status === 201 });

    const listRes = http.get(`${BASE}/notes`);
    check(listRes, { 'status 200': (r) => r.status === 200 });

    sleep(Math.random() * 0.5);
}
