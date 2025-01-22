import React, { useEffect, useState } from 'react';

export default function TemplateDropdown() {
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

  const handleChange = (event) => {
    setSelectedTemplate(event.target.value);
    console.log(`Selected template: ${event.target.value}`);
  };

  return (
    <div>
      <select name="template" value={selectedTemplate} onChange={handleChange}>
        <option value="" disabled>
          Select a template
        </option>
        {templates.map((template) => (
          <option key={`template-${template.id}`} value={template.name}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
