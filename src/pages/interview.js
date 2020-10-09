import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';

import '../utils/interview.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class CodeSandbox extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            js: '',
        };
        this.pusher = new Pusher("af1ef16a2a5a5262b160", {
            cluster: "us2",
            forceTLS: true
        });

        this.channel = this.pusher.subscribe("editor");
        this.channel.bind("code-update", data => {
            const { id } = this.state;
            if (data.id === id) return;

            this.setState({
                js: data.js,
            });
        });
    }

    // componentDidUpdate() {
    //     this.runCode();
    // }

    componentDidMount() {
        this.setState({
            id: pushid(),
        });
    }

    syncUpdates = () => {
        const data = { ...this.state };

        axios
            .post("http://localhost:1337/update-editor", data)
            .catch(console.error);
    };
    runCode = (e) => {
        e.preventDefault()
        const { js } = this.state;
        console.log(js)
        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;
        const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
          </head>
          <body>

            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;

        document.open();
        document.write(documentContents);
        document.close();
    };

    render() {
        const { html, js, css } = this.state;
        const codeMirrorOptions = {
            theme: 'material',
            lineNumbers: true,
            scrollbarStyle: null,
            lineWrapping: true,
        };

        return (
            <div className="App">
                <section className="playground">

                    <div className="code-editor js-code">
                        <div className="editor-header">JavaScript</div>
                        <CodeMirror
                            value={js}
                            options={{
                                mode: "javascript",
                                ...codeMirrorOptions
                            }}
                            onBeforeChange={(editor, data, js) => {
                                this.setState({ js }, () => this.syncUpdates()); // update this line
                            }}
                        />
                    </div>
                    <button onClick={(e) => this.runCode(e)}>Run</button>
                </section>
                <section className="result">
                    <iframe title="result" className="iframe" ref="iframe" />
                </section>
            </div>
        );
    }
}

export default CodeSandbox;
