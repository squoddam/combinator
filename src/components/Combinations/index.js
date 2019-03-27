import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Container,
  CombineBtn,
  CombinationsContainer,
  CombinationBox
} from './styled';

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

Combinations.propTypes = {
  properties: PropTypes.array,
  isValid: PropTypes.bool
};

export default Combinations;
