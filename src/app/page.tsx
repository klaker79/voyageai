'use client';

import { useUserStore } from '@/store';
import HeroSearch from '@/components/dashboard/HeroSearch';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TripsGrid from '@/components/dashboard/TripsGrid';
import AIDeals from '@/components/dashboard/AIDeals';

export default function Dashboard() {
  const { user } = useUserStore();

  // Saludo dinámico basado en hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">{getGreeting()}, {user?.name?.split(' ')[0] || 'Viajero'} 👋</h1>
        <p className="page-subtitle">
          Tu asistente de viajes IA está activo y monitoreando las mejores ofertas para ti.
        </p>
      </div>

      <HeroSearch />

      <StatsGrid />

      <TripsGrid />

      <AIDeals />
    </>
  );
}
