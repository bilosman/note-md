// Editor Panel

function updateCharAndWordCount() {
    const markdownText = document.getElementById('editor-md-text'); // <textarea>

    if (!markdownText) {
        console.error("function updateCharAndWordCount: Markdown text area element not found");
        return;
    };
    markdownText.addEventListener('input', calculateCharAndWordCount)
};

function calculateCharAndWordCount() {
    const markdownText = document.getElementById('editor-md-text').value;

    if (!markdownText) {
        console.error("function calculateCharAndWordCount: Markdown text area element not found");
        return;
    };
    const charCount = markdownText.length;
    const wordCount = markdownText.trim() ? markdownText.trim().split(/\s+/).length : 0;
    document.getElementById('word-char-count').textContent = `${wordCount} Words, ${charCount} Characters`;
};

updateCharAndWordCount();


// Preview Panel

function renderMDTextToHTMLDynamically() {
    const markdownText = document.getElementById('editor-md-text');//.value;
    
    if (!markdownText) {
        console.error("function renderMDTextToHTMLDynamically: Markdown text area element not found");
        return;
    };
    markdownText.addEventListener('input', mdToHtml);

};

function mdToHtml() {
    const markdownText = document.getElementById('editor-md-text').value;
    
    if (!markdownText) {
        console.error("function renderMDTextToHTMLDynamically: Markdown text area element not found");
        return;
    };
    try {
        const md = window.markdownit();
        const htmlContent = md.render(markdownText);
        
        const outputElement = document.getElementById('md-output');
        if (!outputElement) {
            console.error("Markdown output element not found");
            return;
        };

        outputElement.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error parsing markdown:", error);

        const outputElement = document.getElementById('md-output');
        if (outputElement) {
            outputElement.innerHTML = "Error rendering Markdown.";
        }
    };
};

renderMDTextToHTMLDynamically();


// Download Button

function downloadMarkdown() {
    try {
        const markdownText = document.getElementById('editor-md-text');

        if (!markdownText) {
            console.error("function downloadMarkdown: Markdown text area element not found");
            return;
        };
    
        const markdownTextValue = markdownText.value;
        const titleElement = document.getElementById('title');
    
        if (!titleElement) {
            console.error("Title element not found");
            return;
        }
        const filename = titleElement.innerText.trim() || 'Untitled.md';
        const markdownBlob = new Blob([markdownText], { type: 'text/markdown' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(markdownBlob);
        link.download = filename;
        
        // Append the link to the body, and trigger a click event
        document.body.appendChild(link);
        link.click();
        
        // Remove the link from the document
        document.body.removeChild(link);    
    } catch (error) {
        console.error("Error downloading markdown:", error);
    };
};