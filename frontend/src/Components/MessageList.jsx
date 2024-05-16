const MessageList = ({ messages, currentChannel }) => {
  return (
    <>
      {messages.length > 0 && messages.map((message, index) => (
        message.channelId === currentChannel.id && (
          <div key={index} className='text-break mb-2'>
            <b>{message.username}</b>: {message.body} <br />
          </div>
        )
      ))}
    </>
  );
};

export default MessageList;
