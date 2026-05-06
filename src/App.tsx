import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routes } from './routes/Routes';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useState } from 'react';
import Loader from './components/loader/Loader';
import ErrorFallback from './components/errorBoundary/ErrorFallback';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { ThemeContext } from './components/context/ThemeContext';

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={routes} />
          </Suspense>
        </ErrorBoundary>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export default App;
