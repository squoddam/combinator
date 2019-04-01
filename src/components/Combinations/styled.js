import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial;
  margin-top: 30px;
`;

export const CombineBtn = styled(Button).attrs({
  variant: 'outlined'
})`
  flex: 1;
  height: 40px;
  align-self: center;
  border-radius: 10px;
`;

export const CombinationsContainer = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-auto-rows: 200px;
  grid-gap: 10px;
  margin-top: 10px;
`;

export const CombinationBox = styled(Card)`
  width: 200px;
  height: 200px;

  display: flex;
  flex-direction: column;
`;
