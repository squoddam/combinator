import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial;
  margin-top: 30px;
`;

const CombineBtn = styled.button`
  flex: 1;
  height: 40px;
  align-self: center;
  border-radius: 10px;
`;

const CombinationsContainer = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
`;

const CombinationBox = styled.div`
  flex: 1;
  max-width: 200px;
  max-height: 400px;

  display: flex;
  flex-direction: column;

  border: 1px solid;
  margin: 10px;
`;

const CombinationProperty = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
`;

const CombinationPropertyName = styled.div`
  padding-right: 10px;
  margin: 10px;
  color: blue;

  &:after {
    content: ':';
  }
`;

const CombinationPropertyValue = styled.div``;

const Combinations = ({ properties, isValid }) => {
  const [combinations, setCombinations] = useState([]);

  const generateCombinations = () => {
    const count = properties.reduce(
      (acc, property) => acc * property.values.length,
      1
    );

    const generated = [];

    for (let i = 0; i < count; i++) {
      generated.push(
        properties.map((property, index) => ({
          name: property.name,
          // this is a fucking magic, I still don't get shifting :(
          value: property.values[(i >> index) % property.values.length]
        }))
      );
    }

    setCombinations(generated);
  };

  return (
    <Container>
      <CombineBtn onClick={generateCombinations} disabled={!isValid}>
        Combine
      </CombineBtn>
      <CombinationsContainer>
        {combinations.map((comb, i) => (
          <CombinationBox key={i}>
            {comb.map(combProperty => (
              <CombinationProperty key={combProperty.name}>
                <CombinationPropertyName>
                  {combProperty.name}
                </CombinationPropertyName>
                <CombinationPropertyValue>
                  {combProperty.value}
                </CombinationPropertyValue>
              </CombinationProperty>
            ))}
          </CombinationBox>
        ))}
      </CombinationsContainer>
    </Container>
  );
};

export default Combinations;
