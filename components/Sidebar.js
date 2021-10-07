import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatComponent from './ChatComponent'

const Sidebar = () => {

    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users','array-contains', user.email);
    const [chatSnapShot] = useCollection(userChatRef);

    const createChat = ()=>{
        const input = prompt('Please enter an email address for the user you wish to chat with.');

        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email ){
            //We need to add the chat into the db 'chats' collection if it doesnt already exist and is valid
            db.collection('chats').add({ 
                users: [user.email, input],

             })
        }

    }

    const chatAlreadyExist = (recipent)=> !!chatSnapShot?.docs.find((chat) => chat.data().users.find((user) => user === recipent)?.length >0);

  return (
    <Container>

      <Header>
        <UserAvatar src={user.photoURL} onClick={()=> auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchContainer>
            <Search />
            <SearchInput placeholder="Search in chats" />
      </SearchContainer>

      <SideBarButton onClick={createChat} >Start a new chat</SideBarButton>

      {/* List of Chats */}
      {chatSnapShot?.docs.map(chat =>(
          <ChatComponent key={chat.id} id={chat.id} users={chat.data().users} />
      ))}

    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;

`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;

`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const SideBarButton = styled(Button)`
    width: 100%;
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;