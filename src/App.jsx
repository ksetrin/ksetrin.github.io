import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="app">
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </I18nextProvider>
  );
};

export default App;
