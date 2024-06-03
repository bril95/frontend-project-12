import { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ overflowY: 'auto' }}>
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {' '}
          {message.body}
          <br />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
