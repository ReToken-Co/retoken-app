import { howItWorksObjOne, howItWorksObjTwo } from "./Data";
import { InfoSection, Navbar, Footer } from "../../components";

export default function Home() {
  return (
    <>
      <Navbar />
      <InfoSection {...howItWorksObjOne} />
      <InfoSection {...howItWorksObjTwo} />
      <Footer />
    </>
  );
}
