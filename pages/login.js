import styled from 'styled-components';
import Head from 'next/head'
import logo from '../Images/logo.png';
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase';

const login = () => {

    const signIn = ()=>{
        auth.signInWithPopup(provider).catch(alert);
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src='https://res.cloudinary.com/oyindacodes/image/upload/v1632233950/logo_km2ahe.png' />
                <Button onClick={signIn} >Sign In with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default login


const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`
