import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Add from '@material-ui/icons/AddRounded';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import {
  PropertiesContainer,
  Property,
  Controls,
  DeleteBtn,
  PropertyNameInput,
  PropertyValueContainer,
  AddPropertyValueBtn,
  AddPropertyBtn,
  PropertyValuesContainer,
  PropertyValueInput
} from './styled';

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

Config.propTypes = {
  propertiesState: PropTypes.shape({
    properties: PropTypes.array,
    setProperties: PropTypes.func
  }),
  setIsValid: PropTypes.bool
};

export default Config;
