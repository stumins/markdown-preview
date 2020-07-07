import React from "react";
import marked from "marked";
import DOMPurify from 'dompurify';
import {hot} from "react-hot-loader";
import "./MarkdownPreview.css";

const Editor = (props) => {
    return(
        <div id="editor-frame">
            <textarea id="editor">{props.input}</textarea>
        </div>
    );
}

const Preview = (props) => {
    return(
        <div id="preview-frame">
            <div id="preview" dangerouslySetInnerHTML={props.renderMarkdown}></div>
        </div>
    );
}

class MarkdownPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: props.default,
        };
    }
    updateEditor() {

    }
    createMarkup(rawMarkdown) {
        // Must sanitize HTML before rendering!
        return {__html: DOMPurify.sanitize(marked(rawMarkdown))};
    }
    render() {
        return (
            <div id="mainframe">
                <Editor input={this.state.input} />
                <Preview renderMarkdown={this.createMarkup(this.state.input)}/>
            </div>
            
        );
    }
}

export default hot(module)(MarkdownPreview);