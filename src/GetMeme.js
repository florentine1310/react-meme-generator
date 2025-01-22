import React, { useEffect, useState } from 'react';

function GetMeme() {
  const [meme, setMeme] = useState(null);
  useEffect(() => {
    fetch('https://api.memegen.link/templates', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setMeme(data[0].blank);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h2>Meme of the Day:</h2>
      <img src={meme} alt="Meme Template" />
    </div>
  );
}
export default GetMeme;
