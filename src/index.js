import React from "react";
import ReactDOM from "react-dom";
import MarkdownPreview from "./MarkdownPreview.js"

const defaultMarkdown = `# Hello World
## We come in peace

Markdown makes formatting **easy**!

> At least, that's what some people say.

1. this
1. is
1. a 
1. list

\`console.log("This is an in-line code snippet.")\`

----

\`\`\`
lang = "Python"
print(f"This is a \{lang\} code block")
\`\`\`
[this is a link to Google.com](https://www.google.com)

And here's a picture of a puppy ![](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/398px-Golde33443.jpg)
`

ReactDOM.render(<MarkdownPreview default={defaultMarkdown}/>, document.getElementById("root"));