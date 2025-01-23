import React, { useEffect, useState } from 'react';
import { setSelectedTemplate } from './TemplateDropdown';

export default function GetMeme({ setTopText }, { setBottomText }) {
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.memegen.link/images/${setSelectedTemplate}/${setTopText}%2F${setBottomText}`,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        setMeme(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h2>Custom Meme Preview:</h2>
      <img src={meme} alt="Meme Template" />
    </div>
  );
}
