import './app.scss';
import { ReactQueryProvider } from './providers/react-query-provider';
import { Todos } from './views/todos';

export const App = () => {
  return (
    <ReactQueryProvider>
      <Todos />
    </ReactQueryProvider>
  );
};
