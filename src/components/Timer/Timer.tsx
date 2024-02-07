import { memo, useState, useCallback, useEffect } from 'react';
import { Button, ButtonContainer, Container, H1, H2 } from '../StyledComp/styledComp';
import PropTypes from 'prop-types';

const Timer: React.FC = () => {
    const [counter, setCounter] = useState<number>(0)
    const [start, setStart] = useState<boolean>(false)
    let sec: number = Math.floor(counter / 1000)
    let min: number = Math.floor(sec / 60)

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (start) {
            timer = setInterval(() => {
                setCounter(prev => prev + 10);
            }, 10);
        }
        return () => clearInterval(timer);
    }, [start]);

    const formatTimer = useCallback((): string => {
        if (counter >= 1000 && counter < 60000) {
            return sec + ' sec ' + (counter - sec * 1000) + ' msec'
        }
        if (counter >= 60000) {
            return min + ' min ' + (sec - min * 60) + ' sec ' + (counter - sec * 1000) + ' msec'
        }
        return counter + ' msec'
    }, [counter, min, sec])

    const startBtn = useCallback((): void => {
        setStart(prev => !prev)
    }, [])

    const resetBtn = useCallback((): void => {
        setStart(false)
        setCounter(0)
    }, [])

    return (
        <Container>
            <H1>TIMER</H1>
            <H2>{formatTimer()}</H2>
            <ButtonContainer>
                <Button onClick={startBtn}>
                    {start ? 'STOP' : 'START'}
                </Button>
                <Button $reset onClick={resetBtn}>RESET</Button>
            </ButtonContainer>
        </Container>
    )
}

Timer.propTypes = {
    name: PropTypes.string
}

export default memo(Timer)