import FloatingBookButton from '@/components/layout/FloatingBookButton';
import SmoothScroll from '@/components/layout/SmoothScroll';
import About from '@/components/sections/About';
import Benefits from '@/components/sections/Benefits';
import GlobeFooter from '@/components/sections/GlobeFooter';
import HeroScroll from '@/components/sections/HeroScroll';
import PlaneMorph from '@/components/sections/PlaneMorph';

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white select-none">
      <SmoothScroll>
        <HeroScroll>
          <About />
        </HeroScroll>
        <PlaneMorph />
        <Benefits />
        <GlobeFooter />
      </SmoothScroll>
      <FloatingBookButton />
    </main>
  );
}
