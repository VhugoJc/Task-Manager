"use client"
import DashboardSection from '@/components/DashboardSection';
import UserLayout from '@/layout/UserLayout';
import React from 'react'

function Dashboard() {
  return (
    <UserLayout>
      <DashboardSection/>
    </UserLayout>
  );
}

export default Dashboard