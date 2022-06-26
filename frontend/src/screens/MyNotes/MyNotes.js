import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Accordion, Button, Card, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import {noteFatchAction, noteDeleteAction} from "../../redux/action/notes/noteActions"

import MainScreen from "../../components/MainScreen"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.noteList);
  const {loading, noteData, error} = state
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const state2 = useSelector((state) => state.deleteNote);
  const { loading: loadingDelete, error: errorDelete } = state2;


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(noteDeleteAction(id));
    }

    window.location.reload();

  };


  useEffect(() => {
    dispatch(noteFatchAction());
    if (!userInfo) {
      navigate("/")
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {noteData?.map((note, ind) => (
        <Accordion key={ind}>
          <Card style={{ margin: 10 }} key={note._id}>
            <Card.Header style={{ display: "flex" }}>
              <span
                // onClick={() => ModelShow(note)}
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                  {note.title}
                </Accordion.Toggle>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>

                <Button variant="danger" className="mx-2" onClick={()=>deleteHandler(note._id)}>
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                  <footer className="blockquote-footer">
                    Created on{" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
}

export default MyNotes;
