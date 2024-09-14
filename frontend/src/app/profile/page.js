"use client"
import ProfileSection from '@/components/ProfileSection'
import UserLayout from '@/layout/UserLayout'
import React from 'react'

function page() {
  return (
    <UserLayout>
        <ProfileSection/>
    </UserLayout>
  )
}

export default page