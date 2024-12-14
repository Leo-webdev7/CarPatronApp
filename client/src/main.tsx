import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import App from './App';
import HomePage from './pages/HomePage';
import AddVehicle from './pages/AddVehicle'
// import ErrorPage from './pages/Errorpage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Reminders from './pages/Reminders';
import ServiceRecords from './pages/ServiceRecords';
import SignUpPage from './pages/SignUpPage';
import VehicleDetails from './pages/VehicleDetails';
import VehicleExpenses from './pages/VehicleExpenses';
import AddServiceForm from './components/AddServiceForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,        
        element: (
          <>
            <PageTitle title="Car Patron - Vehicle Maintenance App" />
            <LoginPage/>
          </>
        ),
      },
       {
        path: '/SignUpPage',
        element: (
          <>
            <PageTitle title="Sign Up Form - Car Patron" />
            <SignUpPage/>
          </>
        
        ),
      },
       {
         path: '/HomePage',
         element: (
          <>
            <PageTitle title="Home Page - Car Patron" />
            <HomePage/>
          </>        
        ), 
       },
      {
        path: '/AddVehicle',
        element: 
         (
          <>
            <PageTitle title="Add Vehicle - Car Patron" />
            <AddVehicle/>
          </>        
        ),
      },
      {
        path: '/ProfilePage',
        element: (
          <>
            <PageTitle title="User Profile - Car Patron" />
            <ProfilePage/>
          </>        
        ),
      }, 

       {
         path: '/Reminders',
         element: (
          <>
            <PageTitle title="Reminders - Car Patron" />
            <Reminders/>
          </>        
        ),
       },
        {
         path: '/VehicleDetails',
         element: (
          <>
            <PageTitle title="Vehicle Details - Car Patron" />
            <VehicleDetails/>
          </>        
        ),
       },
       {
         path: '/VehicleExpenses',
         element: (
          <>
            <PageTitle title="Vehicle Expenses - Car Patron" />
            <VehicleExpenses vehicleVin=''/>
          </>        
        ),
       },
       {
         path: '/ServiceRecords',
         element: (
          <>
            <PageTitle title="Service Records - Car Patron" />
            <ServiceRecords/>
          </>        
        ),
       }, 

       {
         path: '/AddServiceForm',
         element: <AddServiceForm vehicleVin=""/>
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
