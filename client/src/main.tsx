import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import AddVehicle from './pages/AddVehicle'
import ErrorPage from './pages/Errorpage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Reminders from './pages/Reminders';
import ServiceRecords from './pages/ServiceRecords';
import SignupPage from './pages/SignUpPage';
import VehicleDetails from './pages/VehicleDetails';
import VehicleExpenses from './pages/VehicleExpenses';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SignupPage/>
      },
      {
        index: true,
        element: <LoginPage/>
      },
      {
        index: true,
        element: <Home />
      },
      {
        index: true,
        element: <AddVehicle/>
      },
      {
        index: true,
        element: <ProfilePage/>
      },
      {
        index: true,
        element: <Reminders/>
      },
      {
        index: true,
        element: <ServiceRecords/>
      },
      {
        index: true,
        element: <VehicleDetails/>
      },
      {
        index: true,
        element: <VehicleExpenses/>
      }, 
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

