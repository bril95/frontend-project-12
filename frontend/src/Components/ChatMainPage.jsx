import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetChannelsQuery } from '../usersApi';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../Slice/authSlice';
import { setChannels } from '../Slice/channelsSlice';
import { Container, Row, Col, Navbar, Button, Nav, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentAuthor } from '../Slice/currentAuthorSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const author = useSelector(selectCurrentAuthor);

  useEffect(() => {
    if (token !== null) {
      dispatch(setAuthToken(token));
    }

    if (token === null) {
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  const { data, error } = useGetChannelsQuery();

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (data) {
      dispatch(setChannels(data));
      console.log(data);
    }
  }, [data, error, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const message = formData.get('body');
    console.log(message);
    console.log(author)
    event.target.reset();
  };

return (
  <div className="h-100 bg-light">
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
              <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
              <Button variant="primary">Выйти</Button>
            </Container>
          </Navbar>
          <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
              <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b>Каналы</b>
                  <Button variant="primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                    </svg>
                    <span className="visually-hidden">+</span>
                  </Button>
                </div>
                <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
                  <Nav.Item className="w-100">
                    <Button variant="secondary" className="w-100 rounded-0 text-start">
                      <span className="me-1">#</span>general
                    </Button>
                  </Nav.Item>
                  <Nav.Item className="w-100">
                    <Button variant="light" className="w-100 rounded-0 text-start">
                      <span className="me-1">#</span>random
                    </Button>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className="p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># general</b></p>
                    <span className="text-muted">0 сообщений</span>
                  </div>
                  <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
                  <div className="mt-auto px-5 py-3">
                  <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
                    <InputGroup hasValidation>
                      <Form.Control name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2" />
                      <Button variant="primary" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                          <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                        </svg>
                        <span className="visually-hidden">Отправить</span>
                      </Button>
                    </InputGroup>
                  </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="Toastify"></div>
      </div>
    </div>
  </div>
);
};

export default MainPage;
