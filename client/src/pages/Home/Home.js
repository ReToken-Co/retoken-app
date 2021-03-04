import { bannerObj, homeObjOne } from './Data';
import { Banner, InfoSection } from '../../components';

export default function Home() {
  return (
    <>
      <Banner {...bannerObj} />
      <InfoSection {...homeObjOne} />
    </>
  );
}
