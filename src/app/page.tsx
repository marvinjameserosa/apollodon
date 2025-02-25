'use client'

import { Header } from '@/components/layout/Header'
import  WqiHighlightCard  from '@/components/cards/WqiHighlightCard'
import  MainTabs  from '@/components/tabs/index'
import OverviewCard from '@/components/cards/OverviewCard'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">

        {/* WQI Highlight Card */}
        <WqiHighlightCard />
        
        {/* Dashboard Overview Section */}
        <OverviewCard />

        {/* Main Dashboard Tabs */}
        <MainTabs />
        
        
      </main>
    </div>
  );
}
