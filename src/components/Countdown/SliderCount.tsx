import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React, { Dispatch, SetStateAction, memo } from 'react';
import { H3 } from '../StyledComp/styledComp';
import PropTypes from 'prop-types';

const Input = styled(MuiInput)`
  width: 80px;
  color: rgb(192, 180, 155);
  border: 1px solid rgb(83, 80, 75);
  border-radius: 6px;
  padding: 4px 12px;
`;

function SliderCount(props: {
  valueRef: Array<string | number>,
  value: number,
  start: boolean,
  setValue: Dispatch<SetStateAction<number>>,
  minFormat: () => string | number,
  secFormat: () => string | number,
}): JSX.Element {

  const {
    value,
    setValue,
    start,
    valueRef,
    minFormat,
    secFormat,
  } = props

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const handleInputMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let convertMin = +event.target.value * 60
    setValue(convertMin)
  };


  return (
    <Box sx={{
      width: 300,
      margin: '0 auto',
      border: '1px solid white',
      padding: '2rem',
      borderRadius: '8px',
      borderColor: 'rgb(83, 80, 75)',
    }}>

      <H3>start value</H3>

      <Grid item xs margin='1rem 0'>
        <Slider
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          step={15}
          min={15}
          max={3600}
          disabled={start}
        />
      </Grid>

      <Grid container spacing={2} alignItems="center" justifyContent='center'>
        <Grid item>
          <Input
            value={start ? valueRef[0] : minFormat()}
            onChange={handleInputMinChange}
            readOnly={start}
            inputProps={{
              step: 1,
              min: 0,
              max: 720,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item>
          <Input
            value={start ? valueRef[1] : secFormat()}
            onChange={handleInputChange}
            readOnly={start}
            inputProps={{
              step: 1,
              min: 0,
              max: 59,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

SliderCount.propTypes = {
  value: PropTypes.number,
  valueRef: PropTypes.array,
  start: PropTypes.bool,
  setValue: PropTypes.func,
  minFormat: PropTypes.func,
  secFormat: PropTypes.func,
}

export default memo(SliderCount)