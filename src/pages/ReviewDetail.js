//import 부분
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../redux/modules/comment";
import {actionCreators as reviewAction } from "../redux/modules/review";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { history } from "../redux/configStore";

import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import { makeStyles } from "@material-ui/core/styles";
import Comment from "../components/Comment";
import SelectBookCard from "../components/SelectBookCard";
import CommentModal from "../modals/CommentModal";
import Color from "../shared/Color";
import smile from "../img/smile.svg";


const useStyles = makeStyles((theme) => ({
  goback: {
      padding: "0px 20px"
  },
  icon: {
      margin: "0px 10px",
      
  },
  smile :{
    fontSize: "30px",
    padding: "0px 20px"
  },
  like : {
    margin:" 0px 5px"
  }
}));


const ReviewDetail = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // 로그인 하지 않았을 시 로그인 페이지로 이동
  const token = localStorage.getItem('token');
  if(!token){
    history.push('/login')
  }

  const is_modal = useSelector((state) => state.permit.is_modal);
  const is_editting = useSelector((state) => state.comment.edit_id);
  const [commentContent, setCommentContent] = useState("");
  const bookId = props.match.params.bookid;
  const reviewId = props.match.params.reviewid;
  const reviewDetail = useSelector((state) => state.review.review_detail);
  const {book, comments, content, created_at,hashtags, image, likes, myLike, quote, user } = reviewDetail;


  const userId = useSelector((state) => state.user.user.userId);
  const nickname = useSelector((state) => state.user.user.nickname);

  
  //내 포스트인지 확인
  let is_my_post = false;

  if(userId === user?.id){
    is_my_post = true;
  }

  const goBack = () => {
    history.goBack();
  };
  //댓글 작성함수
  const writeComment = () => {
    if(commentContent === "") return;
    const comment_info = {
      comment: commentContent,
      bookId: bookId,
      reviewId: reviewId,
      userInfo: nickname,
    };
    dispatch(commentAction.addCommentSV(comment_info));
    setCommentContent("");
  };

  //좋아요 클릭
  const clickLikeButton = () => {
    dispatch(reviewAction.LikeSV(bookId, reviewId));
  };

  //네비게이션을 없애고, 리뷰 상세를 불러오기
  useEffect(() => {
    dispatch(permitAction.showNav(false));
    dispatch(reviewAction.getDetailReviewSV(bookId, reviewId));
    dispatch(reviewAction.getFeedId(bookId, reviewId)); // 수정 및 삭제를 위한 feedId
  }, []);


  
  return (
    
      <Container> 
         {is_modal && <CommentModal />}
            <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{goBack()}}
                />
            </Head>
            <Outter>
                <Userbar>
                    <EmojiEmotionsIcon className={classes.smile}/>
                    <Wrapper>
                      <Username>{user?.nickname}</Username>
                      <CreateDt>{created_at}</CreateDt>
                    </Wrapper>
                    {
                      !is_my_post && <Follow>팔로우</Follow>
                    }
                   
                    <BookmarkBorderIcon className={classes.icon}/>
                    {
                      is_my_post &&  <MoreHorizIcon className={classes.icon}/>
                    }
                   
                </Userbar>
                <SelectBookCard {...book} is_reviewDetail />
                <ReviewContent>
                  <Quote> {quote}</Quote>
                  <Content>{content}</Content>
                  <HashTagBox>
                  { hashtags ?
                  hashtags.map((tag) => {
                      return `#${tag} `;
                    }) :""}
                  </HashTagBox>
                  <ImageBox>
                    <Image src={image}/>
                  </ImageBox>
                </ReviewContent>
                <ReactionBar>
                  {
                    myLike ?
                    <Div><FavoriteIcon className={classes.like} />좋아요 {likes} 개</Div>
                    :
                    <Div><FavoriteBorderIcon className={classes.like} />좋아요 {likes} 개</Div>
                  }
                  
                   <Hr></Hr>
                   <Div>댓글 {comments?.length} 개</Div>
                </ReactionBar>

            </Outter>
            <CommentWrapper>
                    {
                      comments?
                    comments.map((comment, idx) => {
                      return <Comment {...comment} key={comment._id} />;
                    }):""}
                    </CommentWrapper>
            {is_editting === "" ? (
              <CommentInputBox>
                <CommentInput
                    placeholder="지금 댓글을 남겨보세요"
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                    value={commentContent}
                    onKeyUp={(e) => (e.key === "Enter" ? writeComment() : null)}
                />
                <CommentWriteButton
                    onClick={() => {
                      writeComment();
                    }}
                >
                  게시
                </CommentWriteButton>
              </CommentInputBox>
          ) : (
              ""
          )}
           
      </Container>
  );
};

const Container = styled.div`
background: ${Color.mainColor};
width: 100vw;
height: auto;
padding-bottom: 100px;
`;
const Head = styled.div`
width: 100%;
align-items: center;
display: flex;
margin: 30px 0px;
`;
const Text = styled.div`
width: 70%;
text-align: center;
`;

const Outter = styled.div`
width: 90%;
height: auto;
border: 1px solid ${Color.black};
margin: 0 auto;
border-radius: 16px;
`;

const Userbar = styled.div`
width: 100%;
height: 20%;
height: 40px;
margin: 16px 0px 30px;
display: flex;
align-items: center;
`;

const Wrapper = styled.div`
`;
const Username = styled.div`
`;

const CreateDt = styled.div`
font-size: 12px;
`;

const Follow = styled.div`
margin: 0px 35px 0px 16px;
font-weight: bold;
width: 100%;
`;




const ReviewContent = styled.div`
`;

const Quote = styled.div`
margin-bottom: 16px;
padding: 0px 20px;
font-family: "Noto Serif KR", serif;
font-weight: bold;
`;

const Content = styled.div`
margin-bottom: 16px;
padding: 0px 20px;
`;

const HashTagBox = styled.div`
padding: 0px 20px;
margin-bottom: 16px;
`;
const ImageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`;
const ReactionBar = styled.div`
border: 1px solid #242121;
width: 90%;
height: 56px;
border-radius: 24px;
margin: 0 auto;
margin-top: 16px;
margin-bottom: 16px;
display: flex;
align-items: center;
`;
const Div = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
`;
const Hr = styled.div`
width: 1px;
height: 100%;
background: black;

`;

const CommentWrapper = styled.div`
width:100%;
height:auto;
`;

const CommentInputBox = styled.div`
  height: 72px;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #c3b4a2;
  background-color: ${Color.mainColor};
  position: fixed;
  bottom: 0;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 0 0 16px;
  font-size: 16px;
  background-color: ${Color.mainColor};
  border: 1px solid ${Color.fontBlack};
  border-radius: 12px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${Color.fontGray};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
  }
`;

const CommentWriteButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: ${Color.fontGray};
  position: absolute;
  right: 30px;
  font-weight: 700;
  height: 20px;
}
`;
export default ReviewDetail;