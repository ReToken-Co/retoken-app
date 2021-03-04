import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../globalStyles';
import Background from '../../images/banner.jpg';
import {
  BannerSection,
  BannerContainer,
  BannerWrapper,
  BannerHeading,
  BannerPara
} from './Banner.style';

const addStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

export default function Banner({
  primary,
  linkTo,
  buttonLabel
}) {
  return (
    <>
      <BannerSection>
        <BannerContainer style={addStyle}>
          <BannerWrapper>
            <BannerHeading>OWN A PIECE OF REAL ASSET</BannerHeading>
            <BannerPara>What are you waiting for?</BannerPara>
            <Link to={linkTo}>
               <Button Big fontBig primary={primary}>
                  {buttonLabel}
               </Button>
            </Link>
          </BannerWrapper>
        </BannerContainer>
      </BannerSection>
    </>

  );
}

