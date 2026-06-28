import React from 'react';
import { Outlet } from 'react-router-dom';
import ManitoWidget from '@/components/manito/ManitoWidget';

// Wraps every route so the Manito widget appears globally, without touching page content.
export default function GlobalLayout() {
  return (
    <>
      <Outlet />
      <ManitoWidget />
    </>
  );
}