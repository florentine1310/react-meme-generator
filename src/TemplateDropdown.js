import { useEffect, useState } from 'react';

export default function TemplateDropdown({ onTemplateChange }) {
  const [templates, setTemplates] = useState([]); // Initialize as empty array
  const [selectedTemplate, setSelectedTemplate] = useState(''); // Handle selected meme template

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('https://api.memegen.link/templates', {
      method: 'GET',
    })
      .then((response) => response.json()) // Parse response as JSON
      .then((data) => {
        setTemplates(data); // Store the full array in state
      })
      .catch((error) => setErrorMessage(error));
  }, []);

  const selectTemplate = (event) => {
    setSelectedTemplate(event.currentTarget.value); // Update template state
    onTemplateChange(event.currentTarget.value);
  };

  return (
    <label>
      Meme template:{' '}
      <select
        name="selectedTemplate"
        value={selectedTemplate}
        onChange={selectTemplate}
      >
        <option value="" hidden>
          Select a template
        </option>
        {templates.map((template) => (
          <option
            key={`template-${template.id}-${template.lines}`}
            value={template.id}
          >
            {template.name}
          </option>
        ))}
      </select>
      <p>{errorMessage}</p>
    </label>
  );
}
