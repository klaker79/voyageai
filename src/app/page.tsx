import HeroSearch from '@/components/dashboard/HeroSearch';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TripsGrid from '@/components/dashboard/TripsGrid';
import AIDeals from '@/components/dashboard/AIDeals';

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Buenos días, Iker 👋</h1>
        <p className="page-subtitle">
          Tu asistente de viajes IA está activo. Tienes 3 ofertas detectadas y 2 viajes en planificación.
        </p>
      </div>

      <HeroSearch />

      <StatsGrid />

      <TripsGrid />

      <AIDeals />
    </>
  );
}
