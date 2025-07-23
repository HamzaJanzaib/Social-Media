import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import { useAppContext } from './context/AppContext';

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes('/admin');
  const { ShowUserLogin, isSeller, loading } = useAppContext();

  const User = false;
  // Show loading screen while initializing
  if (loading) {
    return (
      <>
        <Toaster />
        <div className='flex items-center justify-center h-screen bg-white'>
          <img
            src='https://www.movingtree.com.ar/images/loader.gif'
            alt='loader'
            className='h-20 w-20'
          />
        </div>
      </>
    );
  }

  return (
    <div className='text-gray-700 bg-white min-h-screen'>
      <Toaster />
      {!isSellerPath && <Header />}
      {ShowUserLogin && <Login />}

      <div className={`${isSellerPath ? '' : 'px-4 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          {/* Client Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductsCategory />} />
          <Route path='/products/:category/:id' element={<ProductsDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route path='/verify-code' element={<VerifyCode />} />
          <Route path='/profile' element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path='add-address' element={<AddAddress />} />
            <Route path='Order-Histry' element={<MyOrders />} />
          </Route>
          <Route path='/update-profile' element={<UpdateProfile />} >
            <Route path='Info' index element={<UpdateInfo />} />
            <Route path='Address' element={<UpdateAddress />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />

          {/* Admin Routes (Protected) */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='Add-products' element={<AddProducts />} />
            <Route path='Update-products/:id' element={<AddProducts />} />
            <Route path='products-list' element={<Products />} />
            <Route path='orders' element={<Orders />} />
            <Route path='chats' element={<Chat />} />
            <Route path='setting' element={<Setting />} />
          </Route>

          {/* Admin Login */}
          <Route
            path='/admin-login'
            element={isSeller ? <Navigate to='/admin' /> : <AdminLogin />}
          />
        </Routes>
      </div>

      {!User && <Footer />}
      {!isSellerPath && <ChatWidget />}
    </div>
  );
};

export default App;