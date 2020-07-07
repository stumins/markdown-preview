import React from "react";
import ReactDOM from "react-dom";
import MarkdownPreview from "./MarkdownPreview.js"

const defaultMarkdown = `# Hello World
## We come in peace
### beep boop

1. this
1. is
1. a 
1. list`

ReactDOM.render(<MarkdownPreview default={defaultMarkdown}/>, document.getElementById("root"));