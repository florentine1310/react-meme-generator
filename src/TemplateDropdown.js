import { useEffect, useState } from 'react';

export default function TemplateDropdown({ onTemplateChange }) {
  const [templates, setTemplates] = useState([]); // Initialize as empty array
  const [selectedTemplate, setSelectedTemplate] = useState(''); // Handle selected meme template
  useEffect(() => {
    fetch('https://api.memegen.link/templates', {
      method: 'GET',
    })
      .then((response) => response.json()) // Parse response as JSON
      .then((data) => {
        setTemplates(data); // Store the full array in state
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const selectTemplate = (event) => {
    setSelectedTemplate(event.target.value); // Update template state
    onTemplateChange(event.target.value);
    console.log(`Selected template: ${event.target.value}`);
  };

  return (
    <label>
      Meme template:{' '}
      <select
        name="selectedTemplate"
        value={selectedTemplate}
        onChange={selectTemplate}
      >
        <option value="" disabled>
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
    </label>
  );
}
