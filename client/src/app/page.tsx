'use client';
import Index from '@/components';
import { getCustomerThunk } from '@/redux/thunks/customerThunks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getCustomerThunk when the component mounts
    dispatch(getCustomerThunk() as any);
  }, [dispatch]);
  return <Index />;
}
