import React, { useState } from "react";
import { Link, Notebook, Notepad, PenNibStraight, User } from "phosphor-react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { More } from "@mui/icons-material";
import Undraw from "../../assets/5.png";
import Spinner from "../../components/Loading/Spinner";
import { useNavigate } from "react-router-dom";

const Display = ({ allProjects, myProject, spin }) => {
  const navigate = useNavigate();

  return (
    <>
      {(myProject && allProjects.length > 0) ||
      (!myProject && allProjects.length > 0) ? (
        <>
          {spin ? (
            <Spinner />
          ) : (
            <>
              <Container>
                <Grid container spacing={2}>
                  {allProjects?.map((project, idx) => {
                    const { name, description, link, skills, ownerName } =
                      project;
                    return (
                      <Grid key={idx} item xs={6} sm={6} md={4} lg={3}>
                        <Card>
                          <CardHeader
                            title={name}
                            action={
                              <IconButton>
                                <More />
                              </IconButton>
                            }
                            subheader={ownerName}
                            avatar={
                              <Avatar sx={{ background: "coral" }}>
                                {ownerName[0].toUpperCase()}
                              </Avatar>
                            }
                          />
                          <CardContent>
                            <Typography>{description}</Typography>
                            <Divider />
                            <Grid container spacing={2}>
                              {skills?.map((skill, idx) => (
                                <Grid
                                  item
                                  key={idx}
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  lg={3}
                                >
                                  <Typography color="secondary">
                                    {skill}
                                  </Typography>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                          <CardActions>
                            <Button
                              variant="contained"
                              href={link}
                              target="_blank"
                            >
                              View Project
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            </>

        
          )}
        </>
      ) : (
        <div className="proj_no_log">
          <h3>You have not uploaded any project yet.</h3>
          <button onClick={() => navigate("/create")}>Upload a Project </button>
          <img src={Undraw} alt="Empty" />
        </div>
      )}
    </>
  );
};

export default Display;
