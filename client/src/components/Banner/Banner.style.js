import styled from 'styled-components';

// css codes

export const BannerSection = styled.div`
  padding: 0px 0 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #4b4d63;
`;

export const BannerContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    }
`;

export const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media screen and (max-width: 960px) {
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const BannerHeading = styled.h1`
  color: #fff;
  font-size: 60px;
  margin-bottom: 24px;
`;

export const BannerPara = styled.p`
  margin-top: 8px;
  margin-bottom: 24px;
  color: #fff;
  font-size: 32px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
`;
