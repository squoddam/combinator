import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Add from '@material-ui/icons/AddRounded';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import TextField from '@material-ui/core/TextField';

const StyledInput = styled(TextField)`
  && {
    min-width: 100%;
  }
`;

const DeleteBtn = styled.div`
  cursor: pointer;
  padding: 0 5px;
`;

const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial;
`;

const Property = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  height: 200px;
  flex: 0 0 200px;
`;

const PropertyNameInput = styled(StyledInput)`
  min-width: 100%;
`;

const PropertyValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 50px;
  overflow: auto;
`;

const PropertyValueContainer = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
`;

const Controls = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: -40px;
  display: flex;
  align-items: flex-end;
`;

const PropertyValueInput = styled(StyledInput)`
  max-width: 100px;
  margin: 10px 0;
`;

const AddPropertyBtn = styled(Property)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const AddPropertyValueBtn = styled(Button).attrs({
  variant: 'outlined',
  size: 'small'
})`
  && {
    margin-top: 20px;
    font-size: 0.6em;
  }
`;

const Config = ({
  propertiesState: { properties, setProperties },
  setIsValid
}) => {
  const [notValid, setNotValid] = useState([]);

  useEffect(() => {
    const namesOnly = properties.map(({ name }) => name);
    const notValid = properties
      .filter(
        property =>
          property.name.length === 0 ||
          property.values.some(value => value.length === 0) ||
          namesOnly.filter(name => property.name === name).length > 1
      )
      .map(({ id }) => id);

    setIsValid(notValid.length === 0);

    setNotValid(notValid);
  }, [properties]);

  const isPropertyValid = id => !notValid.includes(id);

  const addProperty = () =>
    setProperties(propertiesDraft => {
      propertiesDraft.push({
        id: Date.now(),
        name: '',
        values: ['']
      });
    });

  const editName = index => e => {
    const name = e.target.value;

    setProperties(propertiesDraft => {
      propertiesDraft[index].name = name;
    });
  };

  const deleteProperty = index => () => {
    setProperties(propertiesDraft => {
      propertiesDraft.splice(index, 1);
    });
  };

  const addValue = propertyIndex => () => {
    setProperties(propertiesDraft => {
      propertiesDraft[propertyIndex].values.push('');
    });
  };

  const editValue = (propertyIndex, valueIndex) => e => {
    const { value } = e.target;

    setProperties(propertiesDraft => {
      propertiesDraft[propertyIndex].values[valueIndex] = value;
    });
  };

  const deleteValue = (propertyIndex, valueIndex) => () => {
    setProperties(propertiesDraft => {
      propertiesDraft[propertyIndex].values.splice(valueIndex, 1);
    });
  };

  return (
    <PropertiesContainer>
      {properties.map((property, i) => (
        <Property key={property.id}>
          {properties.length > 1 && (
            <Controls>
              <DeleteBtn onClick={deleteProperty(i)}>
                <Remove />
              </DeleteBtn>
            </Controls>
          )}
          <PropertyNameInput
            label="Property"
            value={property.name}
            onChange={editName(i)}
            error={!isPropertyValid(property.id)}
          />
          <PropertyValuesContainer>
            {property.values.map((value, iv) => (
              <PropertyValueContainer key={`${property.id}${iv}`}>
                {property.values.length > 1 && (
                  <Controls>
                    <DeleteBtn onClick={deleteValue(i, iv)}>
                      <Remove />
                    </DeleteBtn>
                  </Controls>
                )}
                <PropertyValueInput
                  label="Value"
                  value={value}
                  onChange={editValue(i, iv)}
                  error={!isPropertyValid(property.id)}
                />
              </PropertyValueContainer>
            ))}
            <AddPropertyValueBtn onClick={addValue(i)}>
              <Add />
            </AddPropertyValueBtn>
          </PropertyValuesContainer>
        </Property>
      ))}
      <AddPropertyBtn onClick={addProperty}>
        <Add fontSize="large" />
      </AddPropertyBtn>
    </PropertiesContainer>
  );
};

export default Config;
