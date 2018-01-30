import styled from 'styled-components';

import gasStation3D from '../../../images/gas-station-3d.jpg';
import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';
import { CustomInlineField } from '../../forms/Helpers';

export const Overlay = styled.div`
  background-color: ${color.petrol(0.7)};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 20%;
  left: 72%;
  .fa {
    color: ${color.white()};
  }
`;

export const LoginFormArea = styled.div`
  position: relative;
  top: 25%;
  left: 25%;
  width: 50%;
  overflow: hidden;
`;

export const LoginImageDiv = styled.div`
  background-image: url(${gasStation3D});
  background-position: 50% 50%;
  background-size: cover;
  padding: 0;
  .gradient {
    background: linear-gradient(to bottom, ${color.orange()}, ${color.orange(0.2)});
    height: 100%;
    padding: 50px;
  }
`;

export const ImageCTA = styled.div`
  color: ${color.white()};
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ImageCTAButton = BaseButton.extend`
  background-color: ${color.white()};
  border: 2px solid ${color.white()};
  color: ${color.orange()};
  &:hover {
    background-color: transparent;
    color: ${color.white()};
  }
`;

export const SkewedDiv = styled.div`
  padding: 50px;
  background-color: #fff;
  height: 500px;
  position: relative;
  z-index: 1;
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100px;
    display: block;
    width: 150%;
    background: inherit;
    box-shadow: -50px 0px 100px #222;
    transform: skew(-15deg);
  }
`;

export const LoginTitle = styled.h3`
  color: ${color.orange()};
  font-size: 2rem;
  font-weight: bolder;
  letter-spacing: 2px;
  text-transform: uppercase;
  -webkit-text-stroke: 2px;
`;

export const LoginMessage = styled.div`
  line-height: 1.1;
  text-align: right;
`;

export const InlineField = styled(CustomInlineField)`
  border: 1px solid ${color.orange()};
  border-radius: 30px;
  margin-top: 10px;
`;

export const SupportSection = styled.section`
  margin-top: 20px;
  p {
    font-size: 0.7rem;
    line-height: 0.8;
    a {
      color: ${color.orange()};
      font-weight: bold;
    }
  }
`;

export const LoginButton = BaseButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  color: ${color.white()};
  &:enabled {
    &:hover {
      background-color: ${color.white()};
      color: ${color.petrol()};
    }
  }
`;
