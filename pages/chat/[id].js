import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { db } from '../../firebase'


const Chat = ({ chat, messages }) => {
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen />
            </ChatContainer>
        </Container>
    )
}

export default Chat


export const getServerSideProps = async(ctx)=>{
    const ref = db.collection("chats").doc(ctx.query.id)

    //Prep the messages on the server
    const messagesRes = await ref.collection('messages').order('timestamp','asc').get();

    const messages = messagesRes.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
    })).map(messages=>({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    //Prep the chats
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}


const Container = styled.div`
    display: flex;

`

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrolbar {
        display: none;
    }
    --ms-overflow-style: none; /* IE and EDGE */
    scrollbar-width: none; /*Firefox*/
`;