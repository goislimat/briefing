import styled from 'styled-components';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

export const Main = styled.div`
  border: 50px solid transparent;
`;

export const TransparentSection = styled.section`
  background-color: ${color.petrol(0.9)};
  color: ${color.white()};
  min-height: 85%;
  padding: 50px;
`;

export const LoginButton = BaseButton.extend`
  background-color: transparent;
  border: 2px solid ${color.white()};
  color: ${color.white()};
  &:hover {
    background-color: ${color.white()};
    color: ${color.petrol()};
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bolder;
  letter-spacing: 1px;
  padding: 35px 0;
`;

export const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
`;

export const ArticleFooter = styled.footer`
  padding: 35px 0;
`;

export const CTAButton = BaseButton.extend`
  background-color: ${color.white()};
  border: 0;
  color: ${color.orange()};
  &:hover {
    background-color: ${color.orange()};
    color: ${color.white()};
  }
`;

export const FooterBox = styled.footer`
  background: linear-gradient(to right, ${color.petrol()} 40%, ${color.orange()});
  color: ${color.white()};
  font-weight: bold;
  min-height: 15%;
  padding: 50px;
`;
