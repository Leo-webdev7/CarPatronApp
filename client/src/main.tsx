import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
// import Home from './pages/Home';
// import AddVehicle from './pages/AddVehicle'
// import ErrorPage from './pages/Errorpage';
import LoginPage from './pages/LoginPage';
// import ProfilePage from './pages/ProfilePage';
// import Reminders from './pages/Reminders';
// import ServiceRecords from './pages/ServiceRecords';
import SignupPage from './pages/SignUpPage';
// import VehicleDetails from './pages/VehicleDetails';
// import VehicleExpenses from './pages/VehicleExpenses';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage/>
      },
      {
        path: '/SignupPage',
        element: <SignupPage/>
      },
      // {
      //   path: '/Home',
      //   element: <Home />
      // },
      // {
      //   path: '/AddVehicle',
      //   element: <AddVehicle/>
      // },
      // {
      //   path: '/ProfilePage',
      //   element: <ProfilePage/>
      // },
      // {
      //   path: '/Reminders',
      //   element: <Reminders/>
      // },
      // {
      //   path: '/ServiceRecords',
      //   element: <ServiceRecords/>
      // },
      // {
      //   path: '/VehicleDetails',
      //   element: <VehicleDetails/>
      // },
      // {
      //   path: '/VehicleExpenses',
      //   element: <VehicleExpenses/>
      // }, 
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

