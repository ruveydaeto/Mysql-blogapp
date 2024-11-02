import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import "../styles/home.css";
import gorsel from "../img/post.png";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab] = useState("all");

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };



  const latestPost = posts[4];
  const filteredPosts = activeTab === "all" ? posts : posts.filter(post => post.cat === activeTab);

  const colors = ["#fb96e0", "#72c9ff", "#b8ff8f"];

  const PostCard = ({ post, isLatest }) => (
    <Card key={post.id} className="post" sx={{ maxWidth: "100%", marginBottom: 2, padding: 5, backgroundColor: "rgb(255, 211, 243)", marginRight: "40px" }}>
      <Grid container spacing={2} maxWidth={"100%"} justifyContent={"space-between"}>
        <Grid item xs={8} display="flex" flexDirection="column" style={{ maxWidth: "100%", justifyContent: "space-between" }}>
          <CardContent>
            <div className="divider"></div>
            <Link className="link" to={`/post/${post.id}`}>
              <Typography gutterBottom variant="h5" fontWeight={600} component="div">
                {post.title}
              </Typography>
            </Link>
            <Typography variant="body2" fontSize={15} fontWeight={500} lineHeight={1.7}>
              {truncateText(getText(post.desc), 30)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`/post/${post.id}`}>Read More</Button>
          </CardActions>
        </Grid>
        <Grid item xs={4} container alignItems="center" justifyContent="center">
          <CardMedia
            component="img"
            alt={post.title}
            height={isLatest ? "300" : "140"}
            image={gorsel}
            sx={{ objectFit: "contain" }}
          />
        </Grid>
      </Grid>
    </Card>
  );

  const faqs = [
    { question: "What is this blog about?", answer: "This blog covers various topics including art, science, technology, cinema, design, and food." },
    { question: "How often is the blog updated?", answer: "The blog is updated weekly with new posts." },
    { question: "Can I contribute to the blog?", answer: "Yes, you can contribute by contacting us through the contact form." },
    { question: "Can I contribute to the blog?", answer: "Yes, you can contribute by contacting us through the contact form." },
    { question: "Can I contribute to the blog?", answer: "Yes, you can contribute by contacting us through the contact form." },
  ];

  return (
    <div className="home">
      <div className="first-title">
        <Typography variant="body2" fontSize={22} fontWeight={700} lineHeight={1.7}>BLOG </Typography>
        <Typography variant="body2" fontSize={24} fontWeight={500} lineHeight={1.7}>Accessible design in plain language</Typography>
      </div>
      <div className="divider-text"></div>
      <Box display="flex" sx={{ width: "100%" }}>
        {latestPost && (
          <PostCard post={latestPost} isLatest={true} />
        )}
        <div className="faq">
          <Typography variant="h5" fontWeight={700} fontSize={23} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} marginBottom={2} gutterBottom>Curious Minds Unite!</Typography>
          {faqs?.map((faq, index) => (
            <Accordion key={index} sx={{ marginBottom: 2, backgroundColor: "transparent", borderStyle: "none", boxShadow: "none" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center">
                  <FiberManualRecordIcon fontSize="small" sx={{ marginRight: 1, color: colors[index % colors.length] }} />
                  <Typography fontSize={13}>{faq.question}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Box>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="All" value="all" />
          <Tab label="Art" value="art" />
          <Tab label="Science" value="science" />
          <Tab label="Technology" value="technology" />
          <Tab label="Cinema" value="cinema" />
          <Tab label="Design" value="design" />
          <Tab label="Food" value="food" />
        </Tabs>
      </Box> */}
      <Box display="flex" sx={{ width: "100%" }}>
        <div className="posts" style={{ flex: 3 }}>
          <Typography sx={{ textAlign: "center", marginTop: "50px" }} fontWeight={600} fontSize={"27px"}>MY RECENT WORKS</Typography>
          <Grid container spacing={2} maxWidth={"100%"} justifyContent={"flex-start"}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={6} key={post.id}>
                <Card className="post-card" sx={{ marginBottom: 2, backgroundColor: "#fff7f3", margin: "20px", border: "1px dashed black" }}>
                  <Grid container spacing={2} maxWidth={"100%"} justifyContent={"space-between"}>
                    <Grid item xs={12} display="flex" flexDirection="row" style={{ maxWidth: "100%", justifyContent: "space-between", gap: "16px" }}>
                      <CardContent>
                        <div className="divider"></div>
                        <Link className="link" to={`/post/${post.id}`}>
                          <Typography gutterBottom variant="h6" fontWeight={600} lineHeight={1.4} className="link-title">
                            {post.title}
                          </Typography>
                          <Typography variant="body2" fontSize={13} fontWeight={500} lineHeight={1.7} className="link-desc">
                            {truncateText(getText(post.desc), 30)}
                          </Typography>
                          <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                          <HourglassBottomIcon fontSize="small" sx={{marginTop:"35px",fill:"#72c9ff"}} />
                          <Typography className="reading" variant="body2" marginTop={5} fontSize={12} fontWeight={400} lineHeight={1.5} color="textSecondary">
                            4 minute read
                          </Typography>
                         
                          </Box>
                        </Link>
                      </CardContent>
                      {/* <CardActions>
                        <Button size="small" component={Link} to={`/post/${post.id}`}>Read More</Button> */}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default Home;