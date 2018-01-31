import styled from 'styled-components';

export default styled.button.attrs({
  padding: (props) => {
    if (props.small) return '6px 30px';
    if (props.big) return '12px 58px';
    return '8px 50px';
  },
})`
  cursor: pointer;
  font-weight: bold;
  padding: ${props => props.padding};
  text-transform: uppercase;
  border-radius: ${props => (props.rounded ? '100px' : '0')};
  transition: all 0.5s;
  &:disabled {
    background-color: #777;
    border: 2px solid #666;
    cursor: text;
    filter: saturate(60%);
  }
  &:focus {
    outline: 0;
  }
`;
