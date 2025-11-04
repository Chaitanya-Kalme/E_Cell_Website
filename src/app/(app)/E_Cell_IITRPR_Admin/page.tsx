import AdminNavbar from '@/components/adminNavBar'
import Footer from '@/components/footer'
import HomePageDetailsSection from '@/components/HomePageDetailsSection'
import HomePageHeroSection from '@/components/HomePageHeroSection'
import React from 'react'

export default function AdminHomePage() {
  return (

    <div className="text-black dark:text-white">
      <AdminNavbar />
      <HomePageHeroSection />
      <HomePageDetailsSection />
      <Footer />
    </div>
  )
}