// Import necessary modules and styles
'use client';
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSocket } from "./context/SocketProvider";

export default function Page(): JSX.Element {
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState('');
  const { sendMessage, socket } = useSocket();

  useEffect(() => {
    socket?.on('message', (msg) => {
      setNewMessage(msg, 1);
    });
  }, [socket]);

  function setNewMessage(msg: string, user: number) {
    setMessages((prevMessages: any) => [...prevMessages, { message: msg, user: user }]);
  }

  function handleSendClick() {
    sendMessage(message);
    setNewMessage(message, 0);
    setMessage('');
  }

  return (
    <main className={styles.chatContainer}>
      <div className={styles.chatHistory}>
        {messages.map((message: any, index: number) => (
          <div
            key={index}
            className={message.user === 0 ? styles.sentMessage : styles.receivedMessage}
          >
            {message.message}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputField} 
        />
        <button onClick={handleSendClick} className={styles.sendButton}>
          Send
        </button>
      </div>
    </main>
  );
}
