import styled from 'styled-components'
import { Avatar } from "@material-ui/core";
import getRecipientEmail from '../utils/getRecipientEmail';
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'


const ChatComponent = ({ id, users }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);

    const recipientEmail = getRecipientEmail(users , user)

    const [recipientSnapshot] = useCollection(db.collection("users").where("email","==",getRecipientEmail(users , user)))

    const recipient = recipientSnapshot?.docs?.[0]?.data(); 
    
    const enterChat = ()=>{
        router.push(`/chat/${id}`)
    }

    return (
        <Container onClick={enterChat} >
            { recipient?(
                <UserAvatar src={recipient?.photoURL} />
            ):(
                <UserAvatar>
                    {recipientEmail[0]}
                </UserAvatar>
            )}
            
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default ChatComponent

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;
    
    :hover{
        background-color: #e9eaeb;
    }
`

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`