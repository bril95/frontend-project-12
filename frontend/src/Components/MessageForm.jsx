import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { selectCurrentUsername } from '../Slice/usernameSlice';
import { useAddMessagesMutation } from '../api/usersApi';

const MessageForm = ({ currentChannel }) => {
  const username = useSelector(selectCurrentUsername);
  const [textMessage, setTextMessage] = useState('');
  const [addMessages] = useAddMessagesMutation();
  const { t } = useTranslation(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanedMessage = filter.clean(textMessage);
    const newMessage = { body: cleanedMessage, channelId: currentChannel.id, username: username };
    try {
      await addMessages(newMessage);
      setTextMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setTextMessage(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup hasValidation>
        <Form.Control
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('chatMainPage.placeholderMessage')}
          value={textMessage}
          onChange={handleChange}
          className="border-0 p-0 ps-2"
          autoFocus
          required
        />
        <Button variant="primary" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
