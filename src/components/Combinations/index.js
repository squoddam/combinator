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

const generate = (properties) => {
  const [currentProp, ...others] = properties;
  let children = null;
  if (others.length > 0) {
    children = generate(others);
  }

  const { name, values } = currentProp;

  return values.map(value => {
    if (children) {
      return children.map(child => [
        {
          name,
          value
        },
        ...child,
      ]);
    }

    return [[{
      name,
      value
    }]];
  }).reduce((res, arr) => [...res, ...arr], []);
}

const Combinations = ({ properties, isValid }) => {
  const [combinations, setCombinations] = useState([]);

  const generateCombinations = () =>
    setCombinations(generate(properties));

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
