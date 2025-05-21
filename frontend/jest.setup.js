process.env.VITE_API_URL = 'http://localhost:3000';
import '@testing-library/jest-dom';

jest.mock('./src/api/config', () => ({
  config: {
    API_URL: 'http://mock-api.test',
  },
}));
