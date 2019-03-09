import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: unset;
  border-bottom: 1px solid;
  outline: unset;
  transition: 300ms ease;

  &:focus {
    border-color: red;
  }
`;

const DeleteBtn = styled.div`
  cursor: pointer;
  padding: 0 5px;
`;

const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  font-family: Arial;
`;

const Property = styled.div`
  display: flex;
  align-items: baseline;
  margin: 5px 0;
  padding: 10px;

  &:not(:first-child) {
    border-top: 1px solid grey;
  }

  ${({ isValid }) =>
    !isValid
      ? `
        outline: 2px solid red;
  `
      : ''}
`;

const PropertyName = styled(StyledInput)`
  max-width: 100px;
`;

const PropertyValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 30px;
`;

const PropertyValueContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const PropertyValue = styled(StyledInput)`
  max-width: 100px;
  margin: 10px 0;
`;

const AddPropertyBtn = styled.button`
  margin-top: 20px;
  width: 100px;
  align-self: center;
`;

const AddPropertyValueBtn = styled.button``;

const Config = ({
  propertiesState: { properties, setProperties },
  setIsValid
}) => {
  const [notValid, setNotValid] = useState([]);

  useEffect(
    () => {
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
    },
    [properties]
  );

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
        <Property key={property.id} isValid={isPropertyValid(property.id)}>
          {properties.length > 1 && (
            <DeleteBtn onClick={deleteProperty(i)}>-</DeleteBtn>
          )}
          <PropertyName value={property.name} onChange={editName(i)} />:
          <PropertyValuesContainer>
            {property.values.map((value, iv) => (
              <PropertyValueContainer key={`${property.id}${iv}`}>
                {property.values.length > 1 && (
                  <DeleteBtn onClick={deleteValue(i, iv)}>-</DeleteBtn>
                )}
                <PropertyValue value={value} onChange={editValue(i, iv)} />
              </PropertyValueContainer>
            ))}
            <AddPropertyValueBtn onClick={addValue(i)}>+</AddPropertyValueBtn>
          </PropertyValuesContainer>
        </Property>
      ))}
      <AddPropertyBtn onClick={addProperty}>Add Property</AddPropertyBtn>
    </PropertiesContainer>
  );
};

export default Config;
