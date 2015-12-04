require('../../css/main.css');

'use strict';

import React from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';
import { store } from '../app.js';
import { addTorrent, toggleMagnetModal } from '../actions/actions.js';


let ipc = electronRequire("ipc");

export default class MagnetModal extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.openMagnet = this.openMagnet.bind(this);
    }

    closeModal() {
        store.dispatch(toggleMagnetModal(false));
    }

    openMagnet() {
        let textField = this.refs.magnetField;
        store.dispatch(addTorrent({
            path: textField.getValue(),
            isMagnet: true
        }));
        textField.clearValue();
        this.closeModal();
    }

    render() {
        const buttons = [
            <FlatButton
                key={1}
                onTouchTap={this.closeModal}
                label="Cancel" />,
            <FlatButton
                key={2}
                onTouchTap={this.openMagnet}
                label="Open" />,
        ];
        return (
            <Dialog
                open={this.props.open}
                actions={buttons}
                contentStyle={{
                    "width": "40%",
                    "textAlign": "center"
                }} >
                <h2>Open a magnet link</h2>
                <TextField ref="magnetField"
                           hintText={"Enter the link address here"}
                           hintStyle={{
                               "marginLeft": "30px"
                           }}
                />
            </Dialog>
        );
    }
}