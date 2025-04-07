import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Button } from './Options.styled';

export const FeedbackOptions = ({ options, onReset, total, onLeaveFeedback }) => {
  return (
    <Wrapper>
      {options.map(option => (
        <Button
          key={option}
          type="button"
          onClick={() => onLeaveFeedback(option)}
        >
          {option}
        </Button>
      ))}
      {total > 0 && (
        <Button onClick={onReset}>
          Reset
        </Button>
        )}
    </Wrapper>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};