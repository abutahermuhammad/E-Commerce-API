import http from 'k6/http';
import { sleep } from 'k6';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export default function () {
  // Scenario 1: Test /users endpoint
  const usersScenario = http.batch([
    ['GET', `${API_BASE_URL}/users`],
    ['POST', `${API_BASE_URL}/users`, { name: 'John Doe', email: 'johndoe@example.com' }],
  ]);

  // Scenario 2: Test /products endpoint
  const productsScenario = http.batch([
    ['GET', `${API_BASE_URL}/products`],
    ['POST', `${API_BASE_URL}/products`, { name: 'Product 1', price: 10.99 }],
  ]);

  // Scenario 3: Test user registration flow
  const registerScenario = {
    setup() {
      // Perform any necessary setup steps before the scenario starts
    },
    teardown() {
      // Perform any necessary cleanup steps after the scenario ends
    },
    action() {
      // Make requests to simulate the user registration flow
      http.post(`${API_BASE_URL}/register`, { name: 'John Doe', email: 'johndoe@example.com' });
      sleep(2); // Pause between requests
      http.post(`${API_BASE_URL}/login`, { email: 'johndoe@example.com', password: 'password' });
      sleep(2); // Pause between requests
      http.get(`${API_BASE_URL}/profile`);
    },
  };

  // Run the scenarios concurrently
  const scenarios = {
    users: usersScenario,
    products: productsScenario,
    register: registerScenario,
  };

  const results = http.batch(scenarios);

  // Process and validate the results as needed

  // Pause between iterations (if needed)
  sleep(5);
}
