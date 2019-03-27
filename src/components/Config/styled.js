import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

export const StyledInput = styled(TextField)`
  && {
    min-width: 100%;
  }
`;

export const DeleteBtn = styled.div`
  cursor: pointer;
  padding: 0 5px;
`;

export const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial;
`;

export const Property = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  height: 200px;
  flex: 0 0 200px;
`;

export const PropertyNameInput = styled(StyledInput)`
  min-width: 100%;
`;

export const PropertyValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 50px;
  overflow: auto;
`;

export const PropertyValueContainer = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
`;

export const Controls = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: -40px;
  display: flex;
  align-items: flex-end;
`;

export const PropertyValueInput = styled(StyledInput)`
  max-width: 100px;
  margin: 10px 0;
`;

export const AddPropertyBtn = styled(Property)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const AddPropertyValueBtn = styled(Button).attrs({
  variant: 'outlined',
  size: 'small'
})`
  && {
    margin-top: 20px;
    font-size: 0.6em;
  }
`;
