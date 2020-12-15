import React, { useState, useContext, useEffect } from "react";
import { Container, Nav, NavDropdown, Form, Button, Card, CardColumns, Modal, Tab,  } from "react-bootstrap";
import { Link } from 'react-router-dom';
import UserInfoContext from "../utils/UserInfoContext";
import AuthService from "../utils/auth";
import { saveBook, searchGoogleBooks } from "../utils/API";
import "./style.css";

import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';

//welcome page is the default page new users sent to
//this page can be fixed by changing Create Post button to a Login Button?
//I want this to show login, signup or what?
//...profile page?! /usersavedposts is closest for now



function Welcome() {
//new things:
const [showModal, setShowModal] = useState(false);

  //
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  const userData = useContext(UserInfoContext);
  // create method to search for books and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    searchGoogleBooks(searchInput)
      .then(({ data }) => {
        const bookData = data.items.map((book) => ({
          bookId: book.id,
          authors: book.volumeInfo.authors || ["No author to display"],
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || "",
        }));
        console.log(bookData);
        return setSearchedBooks(bookData);
      })
      .then(() => setSearchInput(""))
      .catch((err) => console.log(err));
  };
  // create function to handle saving a book to our database
  const handleSaveBook = (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }
    // send the books data to our api
    saveBook(bookToSave, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };
  // END OF BOOKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // BEGIN WELCOME section   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <>
      <hr></hr>
      <Card.Body className="welcome-heading">Welcome!</Card.Body>
      <Container className="welcome-container">
        <p className="welcome-text">
          Welcome to Fix My 'Ship, the relationship forum where real
          people give other people real advice.
            <br></br>
            Sink or swim...only you can decide.
          <br></br>
          <br></br>
          <i className="fas fa-anchor fa-3x"></i>
        </p>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row>
            <Card.Body className="buttons-card">
              <Button className="create-post-link" variant="outline-secondary" onClick={() => setShowModal(true)}>Login | Sign Up</Button>{' '}
              {/* <Link className="create-post-link" as={Link} to='/createpost'> create post </Link> */}
            </Card.Body>
          </Form.Row>
        </Form>
      </Container>
      {/* below is WIP */}

      <Modal size='lg' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

    </>
  );
}

export default Welcome;
