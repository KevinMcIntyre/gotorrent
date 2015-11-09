require('../../../css/main.css');

'use strict';

import React from "react";
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, LinearProgress} from "material-ui";
let TransferBar = require('../transferbar.js').TransferBar;

let ipc = electronRequire("ipc");

export const Transfers = React.createClass({
    getInitialState: function () {
        return {
            fixedHeader: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: true,
            height: '100vh'
        }
    },
    render: function () {
        return (
            <div>
                <TransferBar />
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable} >
                    <TableHeader enableSelectAll={this.state.enableSelectAll}>
                        <TableRow>
                            <TableHeaderColumn>#</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Size</TableHeaderColumn>
                            <TableHeaderColumn>Progress</TableHeaderColumn>
                            <TableHeaderColumn>Download</TableHeaderColumn>
                            <TableHeaderColumn>Upload</TableHeaderColumn>
                            <TableHeaderColumn>ETA</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}>
                        <TableRow selected={true}>
                            <TableRowColumn>1</TableRowColumn>
                            <TableRowColumn>ubuntu.iso</TableRowColumn>
                            <TableRowColumn>500 MB</TableRowColumn>
                            <TableRowColumn><LinearProgress mode="indeterminate"/></TableRowColumn>
                            <TableRowColumn>249.6 kB/s</TableRowColumn>
                            <TableRowColumn>0.7 kB/s</TableRowColumn>
                            <TableRowColumn>2h 8m</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
});
