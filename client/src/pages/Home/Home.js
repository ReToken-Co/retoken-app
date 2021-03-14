import { bannerObj, homeObjOne } from "./Data";
import { Banner, InfoSection, Navbar, Footer } from "../../components";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner {...bannerObj} />
      <InfoSection {...homeObjOne} />
      <Footer />
    </>
  );
}
