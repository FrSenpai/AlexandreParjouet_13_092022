import './App.css';
import { Navigation } from './layout/navigation/Navigation';
import { Navigation as NavComponent } from './components/navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './layout/footer/Footer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store/store';
import { persistStore } from 'redux-persist'
function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <header>
            <NavComponent></NavComponent>
          </header>
          <Navigation />
          <Footer></Footer>
        </BrowserRouter>
      </PersistGate>

    </Provider>
  );
}

export default App;
