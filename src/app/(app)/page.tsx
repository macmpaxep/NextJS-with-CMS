import HeroSlider from "@/components/HeroSlider";
import FeatureBlocks from "@/components/FeatureBlocks";
import InstallmentTradeIn from "@/components/InstallmentTradeIn";
import CategoryRows from "@/components/CategoryRows";
import OurWorks from "@/components/OurWorks";
import Certificate from "@/components/Certificate";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureBlocks />
      <InstallmentTradeIn />
      <CategoryRows />
      <OurWorks />
      <Certificate />
    </>
  );
}
