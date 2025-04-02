import './App.css';
import { useEffect, useState } from 'react';
import TemplateDropdown from './TemplateDropdown';

export default function MemeGenerator() {
  const [formData, setFormData] = useState({
    selectedTemplate: '',
    topText: '',
    bottomText: '',
    imgUrl: `https://api.memegen.link/images/preview.jpg?layout=default&template=doge`,
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Update imgUrl whenever formData changes

  useEffect(() => {
    if (formData.selectedTemplate) {
      const topText = encodeURIComponent(formData.topText || '_');
      const bottomText = encodeURIComponent(formData.bottomText || '_');
      const imgUrl = `https://api.memegen.link/images/${formData.selectedTemplate}/${topText}%2F${bottomText}.jpeg`;

      setFormData((prevData) => ({
        ...prevData,
        imgUrl,
      }));
    }
  }, [formData.selectedTemplate, formData.topText, formData.bottomText]);

  // General form change handler
  function handleChange(event) {
    const { name, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Template change handler
  function handleTemplateChange(templateId) {
    setFormData((prevData) => ({
      ...prevData,
      selectedTemplate: templateId,
    }));
  }

  // Handle download button click
  function handleDownload() {
    fetch(formData.imgUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the image');
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'Custom_Meme.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  return (
    <div className="MemeGenerator">
      <h1>Meme Generator</h1>
      {/* Set value to Input*/}
      <TemplateDropdown onTemplateChange={handleTemplateChange} />
      <label>
        Top text:{' '}
        <input
          name="topText"
          placeholder="Your top text"
          value={formData.topText}
          onChange={handleChange}
        />
      </label>
      <label>
        Bottom text:{' '}
        <input
          name="bottomText"
          placeholder="Your bottom text"
          value={formData.bottomText}
          onChange={handleChange}
        />
      </label>
      <h3>Your custom meme:</h3>
      <img
        src={formData.imgUrl}
        alt="Meme template preview"
        data-test-id="meme-image"
      />
      <button onClick={handleDownload}>Download</button>{' '}
      {/* Download Created Image */}
      <p>{errorMessage}</p>
    </div>
  );
}
