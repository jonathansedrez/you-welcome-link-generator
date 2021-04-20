import { useState } from 'react';
import './App.css';
import { Radio } from './radio/radio.component';
import { BitlyClient } from 'bitly';

const bitly = new BitlyClient('a7b645b8cdcbbc10c3aa53b75d49c16a4146bf22', {});

const BASE_URL = 'https://api.whatsapp.com/send';

const App = () => {
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');

  const generateUrl = async () => {
    const newUrl = `${BASE_URL}?phone=55${phone}&text=${encodeURI(message)}`;
    try {
      const response = await bitly.shorten(newUrl);
      setUrl(response.link);
    } catch (error) {
      alert('error ao gerar URL');
      throw error;
    }
  };

  return (
    <main className="wrapper">
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="phone">Telefone:</label>
          <input
            className="phone-input"
            id="phone"
            maxLength={11}
            value={phone}
            placeholder="(51) 000000000"
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <Radio name="messages" onChange={setMessage}>
          <Radio.Option id="Oi! Quero receber uma oração!">
            Oi! Quero receber uma oração!
          </Radio.Option>
          <Radio.Option id="Oi! Eu disse sim para Jesus!">
            Oi! Eu disse "sim" para Jesus!
          </Radio.Option>
          <Radio.Option id="Oi! Quero participar de uma tribo!">
            Oi! Quero participar de uma tribo!
          </Radio.Option>
        </Radio>

        <button onClick={generateUrl} className="primary-button">
          Gerar URL
        </button>
      </form>
      <div>
        <input value={url} id="url" readOnly className="url-input" />
        <button
          onClick={() => navigator.clipboard.writeText(url)}
          className="copy-button"
        >
          copy
        </button>
      </div>
    </main>
  );
};

export default App;
