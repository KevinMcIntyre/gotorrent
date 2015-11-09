require('../../../css/main.css');

'use strict';

import React from "react";
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, LinearProgress} from "material-ui";
let TransferBar = require('../transferbar.js').TransferBar;
let Torrent = require('../torrent.js').Torrent;

let ipc = electronRequire("ipc");

let ubuntu = {
    id: 1,
    name: "ubuntu-14.04.3-desktop-amd64.iso",
    kBytesCompleted: 1037000,
    sizeInKBytes: 1050000
};

let arch = {
    id: 2,
    name: "arch-linux-4.3-server-amd64.iso",
    kBytesCompleted: 20634,
    sizeInKBytes: 1050000
};
export const Transfers = React.createClass({
    getInitialState: function () {
        return {
            swag: true
        }
    },
    render: function () {
        return (
            <div>
                <TransferBar />
                <div className="transfers">
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                    <Torrent torrent={ubuntu}/>
                    <Torrent torrent={arch}/>
                </div>
            </div>
        );
    }
});
