import React, { useState } from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial;
  margin-top: 30px;
`;

const CombineBtn = styled(Button).attrs({
  variant: 'outlined'
})`
  flex: 1;
  height: 40px;
  align-self: center;
  border-radius: 10px;
`;

const CombinationsContainer = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-auto-rows: 200px;
  grid-gap: 10px;
  margin-top: 10px;
`;

const CombinationBox = styled(Card)`
  width: 200px;
  height: 200px;

  display: flex;
  flex-direction: column;
`;

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
        //TODO: Handle reverse gracefully
        Array.from(properties)
          .reverse()
          .map((property, index) => ({
            name: property.name,
            // this is a fucking magic, I still don't get shifting :(
            value: property.values[(i >> index) % property.values.length]
          }))
          .reverse()
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comb.map(combProperty => (
                  <TableRow key={combProperty.name}>
                    <TableCell>{combProperty.name}</TableCell>
                    <TableCell align="right">{combProperty.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CombinationBox>
        ))}
      </CombinationsContainer>
    </Container>
  );
};

export default Combinations;
