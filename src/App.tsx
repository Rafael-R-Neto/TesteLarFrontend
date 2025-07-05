import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { AppRoutes } from './app/routes/AppRoutes';
import { ToastViewer } from './components/common/ToastViewer';
import { ConfirmModal } from './components/common/ConfirmModal';
import { Loading } from './components/common/Loading';

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <AppRoutes />
        <ToastViewer />
        <ConfirmModal />
        <Loading />
      </div>
    </BrowserRouter>
  )
}

export default App
