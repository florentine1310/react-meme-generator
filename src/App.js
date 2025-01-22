import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GetMeme from './GetMeme';
import TemplateDropdown from './TemplateDropdown';

export default function MemeGenerator() {
  // Create state for input
  const [topText, setTopText] = useState();
  const [bottomText, setBottomText] = useState();
  return (
    <div className="MemeGenerator">
      <h1>Meme Generator</h1>
      {/* Set value to Input*/}
      <TemplateDropdown />
      Top Text:{' '}
      <input
        value={topText}
        onChange={(event) => {
          setTopText(event.currentTarget.value);
        }}
      />
      Bottom Text:{' '}
      <input
        value={bottomText}
        onChange={(event) => {
          setBottomText(event.currentTarget.value);
        }}
      />
      <button>Download</button> {/* Download Created Image */}
      <GetMeme />
    </div>
  );
}
