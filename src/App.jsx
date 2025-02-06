import { ThemeProvider } from './utils/ThemeContext';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductPage from './pages/ProductPage';
import PaymentsPage from './pages/PaymentsPage';
import OrdersPage from './pages/OrdersPage';
import Analytics from './components/analytics/Analytics';
import SettingsPage from './pages/SettingsPage';
import CustomerPages from './pages/CustomerPages';
import MailsPage from './pages/MailsPage';
import './App.css';
import { useState } from 'react';
 
function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); 
  };

  return (
    <ThemeProvider>
      <div className={`Container ${sidebarVisible ? 'SidebarVisible' : ''}`}>
        <Sidebar isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
        <div className="MainContainer">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="Page">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/customer" element={<CustomerPages />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/mails" element={<MailsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
