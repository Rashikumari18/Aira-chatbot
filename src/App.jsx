
import { useState, useRef, useEffect } from 'react'
import './App.css'

function getReply(message) {
  const text = message.toLowerCase()

  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return 'Hey there! 💙 I am Aira. How can I help you today?'
  }

  if (text.includes('your name') || text.includes('who are you')) {
    return 'I am Aira, your friendly chatbot! 😊'
  }

  if (text.includes('how are you')) {
    return "I'm doing great! Thanks for asking. How are you? 💙"
  }

  if (text.includes('joke')) {
    return 'Why did the computer go to the doctor? Because it had a virus! 😂'
  }

  if (text.includes('sad') || text.includes('lonely')) {
    return "I'm here to listen. 💙 Want to tell me what's bothering you?"
  }

  if (text.includes('motivate')) {
    return 'Small steps every day lead to big changes. Believe in yourself! ✨'
  }

  if (text.includes('thank')) {
    return "You're always welcome! 😊"
  }

  if (text.includes('bye')) {
    return 'Bye bye! Take care and have a lovely day. 👋'
  }

  if (text.includes('time') || text.includes('date')) {
    return 'Current date and time: ' + new Date().toLocaleString()
  }

  return "I'm still learning! 😊 Try saying hello, asking for a joke, or asking how I am."
}

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hey! 👋 I'm Aira, your friendly chatbot. How can I help you today?",
      sender: 'bot',
    },
  ])

  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(event) {
    event.preventDefault()
    const message = input.trim()

    if (!message || typing) return

    setMessages((previous) => [
      ...previous,
      { text: message, sender: 'user' },
    ])

    setInput('')
    setTyping(true)

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { text: getReply(message), sender: 'bot' },
      ])
      setTyping(false)
    }, 500)
  }

  return (
    <main className="app">
      <section className="chat-card">
        <header className="chat-header">
          <div className="avatar">A</div>

          <div className="header-info">
            <h1>Aira</h1>
            <p>
              <span className="online-dot"></span>
              Your friendly AI companion
            </p>
          </div>

          <span className="header-sparkle">✦</span>
        </header>

        <div className="chat-body">
          <div className="date-label">TODAY</div>

          {messages.map((message, index) => (
            <div className={`message-row ${message.sender}`} key={index}>
              {message.sender === 'bot' && (
                <div className="small-avatar">A</div>
              )}

              <div className="message-bubble">{message.text}</div>
            </div>
          ))}

          {typing && (
            <div className="message-row bot">
              <div className="small-avatar">A</div>
              <div className="message-bubble typing">Aira is typing...</div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="quick-prompts">
          <button type="button" onClick={() => setInput('Tell me a joke')}>
            😄 Tell me a joke
          </button>

          <button type="button" onClick={() => setInput('Motivate me')}>
            ✨ Motivate me
          </button>

          <button type="button" onClick={() => setInput('How are you?')}>
            💙 How are you?
          </button>
        </div>

        <form className="chat-input-area" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Type your message"
          />

          <button
            className="send-button"
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Send message"
          >
            ➤
          </button>
        </form>

        <footer className="chat-footer">Made with 💙 by Aira</footer>
      </section>
    </main>
  )
}

export default App
