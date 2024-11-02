import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import "../styles/single.css";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Single = () => {
  const [post, setPost] = useState({});
  const [morePosts, setMorePosts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    const fetchMorePosts = async () => {
      try {
        const res = await axios.get(`/posts`);
        setMorePosts(res.data.filter(p => p.id !== postId).slice(0, 2));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMorePosts();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
        </div>
        <h1 className="single-title">{post.title}</h1>
        <div className="divider-text"></div>
        <span className="publication">
          <AccessTimeIcon sx={{ marginRight: "5px",fill:"#b193a2" }} />
          Publication: {moment(post.date).format("MMMM DD")}
        </span>
        <p
          className="single-desc"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <Box display="flex" sx={{ width: "100%" }}>
        <Box className="last-post" sx={{ flex: 3, margin: "40px" }}>
          <Box className="div-area">
            <Typography style={{ marginLeft: "20px" }} fontSize={"35px"}>
              More <span style={{ fontWeight: "bold", fontSize: "35px" }}>articles</span>
            </Typography>
            <div className="more-divider" style={{ marginTop: "10px", marginLeft: "20px", border: "1px dashed black" }}></div>
          </Box>
          <Grid container spacing={2} maxWidth={"100%"} justifyContent={"flex-start"}>
            {morePosts.slice(0, 2).map((morePost) => (
              <Grid item xs={12} sm={6} md={6} key={morePost.id}>
                <Card
                  sx={{
                    marginBottom: 2,
                    backgroundColor: "#fff7f3",
                    margin: "20px",
                    border: "1px dashed black",
                  }}
                >
                  <Grid container spacing={2} maxWidth={"100%"} justifyContent={"space-between"}>
                    <Grid item xs={12} display="flex" flexDirection="row" style={{ maxWidth: "100%", justifyContent: "space-between", gap: "16px",height:"300px" }}>
                      <CardContent>
                        <div className="divider"></div>
                        <Link className="link" to={`/post/${morePost.id}`}>
                          <Typography gutterBottom variant="h6" fontWeight={600} component="div">
                            {morePost.title}
                          </Typography>
                          <Typography variant="body2" fontSize={11} fontWeight={500} lineHeight={1.7}>
                            {truncateText(getText(morePost.desc), 30)}
                          </Typography>
                          <Typography variant="body2" marginTop={5} fontSize={12} fontWeight={400} lineHeight={1.5} color="textSecondary">
                            4 minute read
                          </Typography>
                        </Link>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ marginTop: "20px", marginBottom: "70px" }}>
        <Link to="/" style={{ fontSize: "20px", color: "black", display: "flex", alignItems: "center", textDecoration: "none", borderBottom: "1px solid black",fontWeight:"700" }}>
          <ArrowBackIcon sx={{ marginRight: "5px" }} />
          Back to Blog
        </Link>
      </Box>
    </div>
  );
};

export default Single;