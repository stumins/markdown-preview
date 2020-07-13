import React from "react";
import marked from "marked";
import DOMPurify from 'dompurify';
import {hot} from "react-hot-loader";
import "./MarkdownPreview.css";

const Button = (props) => {
    let bgColor = props.linebreaks ? "lightgreen" : "lightskyblue";
    return(
        <div id="btn" style={{backgroundColor: bgColor}} value={props.linebreaks} onClick={props.onClick}>
            Markdown linebreak on editor newline: {props.linebreaks ? "ON" : "OFF"}
        </div>
    );
}

const Editor = (props) => {
    return(
        <div id="editor-frame" className="md-frame">
            <h2 id="editor-h">Editor</h2>
            <textarea id="editor" className="data-tile" value={props.input} onChange={props.onChange}></textarea>
        </div>
    );
}

const Preview = (props) => {
    return(
        <div id="preview-frame" className="md-frame">
            <h2 id="preview-h">Preview</h2>
            <div id="preview" className="data-tile" dangerouslySetInnerHTML={props.renderMarkdown}></div>
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
        this.setState((state, props) => ({
            linebreaks: !state.linebreaks
        }));
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
            <div id="main-frame">
                <Button linebreaks={this.state.linebreaks} onClick={this.handleButtonClick} />
                <div id="content-frame">
                    <Editor input={this.state.input} onChange={this.handleInputChange} />
                    <Preview renderMarkdown={this.createMarkup(this.state.input)}/>
                </div>
            </div>
            
        );
    }
}

export default hot(module)(MarkdownPreview);