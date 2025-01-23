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
    const { name, value } = event.target;
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
    console.log(`Template ID received in Meme Generator: ${templateId}`);
  }

  // Handle download button click
  function handleDownload() {
    const link = document.createElement('a');
    link.href = formData.imgUrl;
    link.download = 'Custom Meme.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <img src={formData.imgUrl} alt="Meme template preview" />
      <button onClick={handleDownload}>Download</button>{' '}
      {/* Download Created Image */}
    </div>
  );
}
