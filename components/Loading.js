import styled from 'styled-components';
import { Circle } from 'better-react-spinkit'

const Loading = () => {
    return (
        <center style={{display:'grid', placeItems: 'center', height: '100vh' }} >
           <div>
                <img src="https://res.cloudinary.com/oyindacodes/image/upload/v1632233950/logo_km2ahe.png"
                     alt=""
                     height={200}
                     style={{ marginBottom: 10 }}
                />
                <Circle color="#3cbc28" size={60} />
           </div> 
        </center>
    )
}



export default Loading
