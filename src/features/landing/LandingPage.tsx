import BackgroundDecor from "./components/BackgroundDecor";
import LandingFooter from "./components/LandingFooter";
import LandingHeader from "./components/LandingHeader";
import LandingMain from "./components/LandingMain";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <BackgroundDecor />
      <LandingHeader />
      <LandingMain />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
