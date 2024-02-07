import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import signal from '../../assets/audio/signal.mp3';
import { Button, ButtonContainer, Container, H1, H2, ProgressBaContainer, ProgressBar } from '../StyledComp/styledComp';
import SliderCount from './SliderCount';

const Countdown: React.FC = () => {
    const [start, setStart] = useState<boolean>(false)
    const [value, setValue] = useState<number>(30)
    let min: number = Math.floor(value / 60);
    if (value > 43200) setValue(43200)
    if (value < 0) setValue(0)

    const playSignal = () => {
        new Audio(signal).play()
    }

    useEffect(() => {
        let timer: undefined | NodeJS.Timeout;
        if (start) {
            timer = setInterval(() => {
                setValue(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [start]);

    useEffect(() => {
        if (value === 0) {
            setTimeout(() => {
                setStart(false)
                setValue(30)
            }, 2000)
            playSignal()
        }
    }, [value])

    const formatTimer = useCallback((): string => {
        if (value >= 60) {
            return min + ' min ' + (value - min * 60) + ' sec '
        }
        return value + ' sec'
    }, [value, min])

    const startBtn = useCallback((): void => {
        setStart(prev => !prev)
    }, [])

    const resetBtn = useCallback((): void => {
        setStart(false)
        setValue(30)
    }, [])

    const minFormat = useCallback(() => {
        return min < 10 ? `0${min}` : min;
    }, [min])

    const secFormat = useCallback(() => {
        let sec: number = value
        if (sec >= 60) return (sec - min * 60)
        if (sec < 10) return `0${sec}`;
        return sec
    }, [min, value])

    // сохраняем значение, с которого начался отсчет
    let valueRef = useRef<(string | number)[]>([])
    useMemo(() => {
        if (start) {
            valueRef.current = [minFormat(), secFormat()]
        }
    }, [start, minFormat, secFormat])

    const timeProgress = useCallback((): number => {
        let progress: number = value / (+valueRef.current[0] * 60 + +valueRef.current[1]) * 100
        return +progress.toFixed(1)
    }, [value])

    return (
        <Container>
            <H1>Countdown</H1>
            <SliderCount
                value={value}
                setValue={setValue}
                start={start}
                valueRef={valueRef.current}
                minFormat={minFormat}
                secFormat={secFormat}
            />

            <H2>{formatTimer()}</H2>
            <ProgressBaContainer>
                {start ?
                    <ProgressBar style={{ width: `${timeProgress()}%` }} /> :
                    <ProgressBar style={{ width: '100%' }} />
                }
            </ProgressBaContainer>

            <ButtonContainer>
                <Button onClick={startBtn} disabled={!Boolean(value)}>
                    {start ? 'STOP' : 'START'}
                </Button>
                <Button $reset onClick={resetBtn}>RESET</Button>
            </ButtonContainer>
        </Container>
    )
}

export default memo(Countdown)