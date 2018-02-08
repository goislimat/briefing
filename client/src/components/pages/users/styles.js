import styled from 'styled-components';
import { Form } from 'formik';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

const randomColor = (rColor) => {
  switch (rColor) {
    case 1:
      return color.blue();
    case 2:
      return color.menuLightGray();
    case 3:
      return color.green();
    case 4:
      return color.orange();
    case 5:
      return color.purple();
    case 6:
      return color.red();
    case 7:
      return color.yellow();
    default:
      return color.menuDarkGray();
  }
};

export const CardGutter = styled.div`
  padding: 20px;
`;

export const Card = styled.div`
  background-color: ${color.white()};
  border-left: 5px solid ${props => randomColor(props.color)};
  color: ${props => randomColor(props.color)};
  margin: 0;
  min-height: 135px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0 0 30px #aaa;
  }
  &.new {
    border: 0;
  }
`;

export const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.menuLightGray()};
  color: white;
  font-size: 4rem;
  margin: 5px 0 5px 5px;
  .fa-ban {
    color: ${color.red()};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .company {
    font-size: 1.2rem;
    text-transform: uppercase;
    &,
    .name {
      font-weight: bold;
    }
  }
  .name,
  .email {
    color: ${color.grayText()};
  }
`;

export const UserActions = styled.div`
  padding: 0;
  color: ${color.grayText()};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${Card}:hover & {
    div {
      &::before {
        padding-right: 10px;
        font-size: 0.7rem;
      }
      &.delete::before {
        content: 'Excluir';
      }
      &.block::before {
        content: 'Bloquear';
      }
      &.unblock::before {
        content: 'Desbloquear';
      }
      &.reset::before {
        content: 'Resetar Senha';
      }
      &.edit::before {
        content: 'Editar';
      }
      &.move::before {
        content: 'Briefings';
      }
    }
  }
`;

export const ActionButton = BaseButton.extend`
  height: 45px;
  width: 45px;
  color: ${color.white()};
  background-color: ${color.menuDarkGray()};
  border: 2px solid ${color.white()};
  padding: 0;
  &.block {
    background-color: ${color.red()};
  }
  &:disabled {
    border: 2px solid ${color.white()};
  }
`;

export const DeleteButton = ActionButton.extend`
  background-color: ${color.red()};
`;

export const StyledForm = styled(Form)`
  margin: 20px 0;
`;

export const FormGroup = styled.div`
  input {
    border: 0;
    outline: 0;
    padding-left: 5px;
    &:focus {
      border-left: 2px solid ${color.menuDarkGray()};
    }
    &.company {
      font-weight: bold;
    }
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const SaveButton = BaseButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  color: ${color.white()};
  margin-top: 40px;
  width: 100%;
  &:enabled {
    &:hover {
      background-color: transparent;
      color: ${color.petrol()};
    }
  }
`;

export const BackButton = BaseButton.extend`
  background-color: ${color.white()};
  border: 2px solid ${color.white()};
  color: #ddd;
  margin-bottom: 20px;
  padding: 0;
  &:enabled {
    &:hover {
      i {
        font-weight: bold;
      }
    }
  }
`;

export const AddButton = BaseButton.extend`
  background-color: transparent;
  border: 0;
  font-size: 4rem;
  ${Card}:hover & {
    color: ${color.grayText()};
  }
`;

export const BriefingsList = styled.div`
  input[type='checkbox'] {
  }
`;
