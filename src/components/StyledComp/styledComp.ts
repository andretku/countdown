import styled from 'styled-components'

export const Button = styled.button<{ $reset?: boolean; }>`
    background: transparent;
    color: ${props => props.$reset ? "darkred" : "green"};

    font-size: 0.8rem;
    font-weight: bold;
    padding: 1rem 4rem;
    border: 2px solid ${props => props.$reset ? "darkred" : "green"};
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        color: ${props => props.$reset ? "red" : "lightgreen"};
        border: 2px solid ${props => props.$reset ? "red" : "lightgreen"};
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        transition: 0.2s ease-out;
    }

    &:active {
        color: white;
        border: 2px solid white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px inset;
        transition: 0.2s ease-out;
    }
`;

export const Container = styled.div`
    width: 100%;
    text-align: center;
`

export const ButtonContainer = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    width: 400px;
    margin: 2rem auto
`

export const H1 = styled.h1`
    color: wheat;
    text-transform: uppercase;
    font-size: 1.7rem;
    font-weight: bold;
    font-family: Roboto, Arial, serif;
    margin-top: 3rem;
`

export const H2 = styled.h2`
    color: wheat;
    font-size: 1.4rem;
    font-weight: bold;
    font-family: Roboto, Arial, serif;
    text-align: center;
`

export const H3 = styled.h3`
    color: rgb(189, 174, 145);
    font-size: 0.9rem;
    text-transform: uppercase;
    font-family: Roboto, Arial, serif;
    text-align: center;
`

export const H4 = styled.h4`
    color: rgb(189, 174, 145);
    font-size: 0.7rem;
    text-transform: uppercase;
    font-family: Roboto, Arial, serif;
    text-align: center;
`

export const ProgressBaContainer = styled.div`
    background: rgb(100, 100, 100);
    width: 400px;
    margin: 1rem auto 0;
    overflow: hidden;
    height: 2px;
`

export const ProgressBar = styled.div`
    background: white;
    width: 100%;
    height: 2px;

`