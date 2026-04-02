import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import SecuritySection from "./SecuritySection";
import WorkflowSection from "./WorkflowSection";

const LandingMain = () => {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <SecuritySection />
    </main>
  );
};

export default LandingMain;
