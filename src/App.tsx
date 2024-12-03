import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { WalletManagement } from './pages/WalletManagement';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  console.log('App rendering');
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="wallets" element={<WalletManagement />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;