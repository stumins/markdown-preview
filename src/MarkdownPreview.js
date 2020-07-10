import React from "react";
import marked from "marked";
import DOMPurify from 'dompurify';
import {hot} from "react-hot-loader";
import "./MarkdownPreview.css";

const Button = (props) => {
    return(
        <div id="btn-frame">
            <label for="toggle-linebr">Markdown linebreak on newline: {props.linebreaks ? "ON" : "OFF"}</label>
            <input type="checkbox" id="toggle-linebr" value={props.linebreaks} onClick={props.onClick}></input>
        </div>
    );
}

const Editor = (props) => {
    return(
        <div id="editor-frame">
            <textarea id="editor" value={props.input} onChange={props.onChange}></textarea>
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
            linebreaks: false
        };
        this.createMarkup = this.createMarkup.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        this.setState({
            linebreaks: !this.state.linebreaks
        });
    }

    handleInputChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    createMarkup(rawMarkdown) {
        // Must sanitize HTML before rendering!
        return {__html: DOMPurify.sanitize(marked(rawMarkdown))};
    }
    render() {
        // Allow Markdown linebreak on newline
        marked.setOptions({
            breaks: this.state.linebreaks,
        });
        
        return (
            <div id="mainframe">
                <Button linebreaks={this.state.linebreaks} onClick={this.handleButtonClick} />
                <Editor input={this.state.input} onChange={this.handleInputChange} />
                <Preview renderMarkdown={this.createMarkup(this.state.input)}/>
            </div>
            
        );
    }
}

export default hot(module)(MarkdownPreview);