import React, { useEffect, useState } from "react";
import {useSelector , useDispatch} from "react-redux"
import {useNavigate, useParams} from "react-router-dom" 
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import axios from "axios";

import { noteUpdataAction, noteDeleteAction } from "../../redux/action/notes/noteActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function SingleNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

    const state = useSelector((state) => state.updateNote);
    const { loading, error } = state;

    const state2 = useSelector((state) => state.deleteNote);
    const { loading: loadingDelete, error: errorDelete } = state2;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
      const fetching = async () => {
        const { data } = await axios.get(`/api/notes/${id}`);

        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
      };

      fetching();
  }, [id, date]);


    const handelSubmit = (e) => {
      e.preventDefault();

      const crateData = { title, content, category };
      dispatch(noteUpdataAction(id, crateData));

      if (!title || !content || !category) return;

      navigate("/mynotes");
    };

    const deleteHandler = () => {
        if (window.confirm("Are you sure?")) {
          dispatch(noteDeleteAction(id));
        }
      navigate("/mynotes");
    };


  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group controlId="title">
              {loadingDelete && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler()}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">Updated on -</Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
