process.env.VITE_API_URL = 'http://localhost:3000'; // або ваш тестовий URL
import '@testing-library/jest-dom';

// Мок import.meta.env через обгортку
jest.mock('./src/api/config', () => ({
  config: {
    API_URL: 'http://mock-api.test',
  },
}));
