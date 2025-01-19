const editor = CodeMirror.fromTextArea(document.getElementById("editor"),{
    mode:"javascript",
    theme:"material",
    lineNumbers:true,
    indentUnit:4,
    tabSize:4,
    lineWrapping:true,
});
document.getElementById('language').addEventListener('change', (event) => {
    const language = event.target.value;
    editor.setOption('mode', language.toLowerCase());
  });
  
  document.getElementById('debug-btn').addEventListener('click', async () => {
    const code = editor.getValue();
    const language = document.getElementById('language').value;
  
    const response = await fetch('https://localhost:8000/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, language }),
    });
  
    const data = await response.json();
    document.getElementById('output').innerText = data.result;
  });