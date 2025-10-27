'use client'

import { useEffect, useState } from 'react';
import AdminLogin from '@/app/_components/AdminLogin';
import ForgotPasswordModal from '@/app/_components/ForgotPasswordModal';
import Loader from '@/app/_components/Loader';

export default function page() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
  },[])

  if(loading){
    return <Loader />
  }

  return (
    <>
      <AdminLogin 
        onForgotPassword={(email) => {
          setLoginEmail(email);
          setIsForgotPasswordOpen(true);
        }}
      />
      
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        initialEmail={loginEmail}
      />
    </>
  );
}