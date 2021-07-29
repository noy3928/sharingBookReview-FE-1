//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


const CommentModal = (props) =>{
  //dispatch와 변수들

//useEffect
React.useEffect(()=>{
},[]);




    return(
        <React.Fragment>
          <Outter>
         <Container>
            <Btn><DeleteOutlineOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>댓글 삭제</Btn>
            <Btn><CreateOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>댓글 수정</Btn>
         </Container>
         </Outter>
        </React.Fragment>
    )
}



//styled components
const Outter = styled.div`
width: 100vw;
height: 100vh;
background-color:rgba(0, 0, 0, 0.5);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Container = styled.div`
width: 328px;
border-radius: 12px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: #fff;
`;
const Btn = styled.div`
width: 288px;
height: 56px;
display: flex;
line-height: 56px;
align-items: center;
font-weight: 500;
font-size: 14px;
&:hover {
    color: red;
}
`;
export default CommentModal;