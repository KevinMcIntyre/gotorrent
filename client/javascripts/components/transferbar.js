require('../../css/main.css');

'use strict';

import React from "react";
import {Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator, DropDownMenu, RaisedButton, FontIcon, DropDownIcon} from "material-ui";

let filterOptions = [
    { payload: '1', text: 'All Broadcasts' },
    { payload: '2', text: 'All Voice' },
    { payload: '3', text: 'All Text' },
    { payload: '4', text: 'Complete Voice' },
    { payload: '5', text: 'Complete Text' },
    { payload: '6', text: 'Active Voice' },
    { payload: '7', text: 'Active Text' },
];
let iconMenuItems = [
    { payload: '1', text: 'Download' },
    { payload: '2', text: 'More Info' }
];

let toolbarStyle = {
    padding: "0",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.156863) 0px 1px 5px, rgba(0, 0, 0, 0.227451) 0px 1px 5px"
};

export const TransferBar = React.createClass({
    render: function () {
        return (
            <Toolbar style={toolbarStyle}>
                <ToolbarGroup key={0} float="left">
                    <DropDownMenu menuItems={filterOptions} />
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <ToolbarTitle text="Options" />
                    <FontIcon className="mui-icon-sort" />
                    <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
                    <ToolbarSeparator/>
                    <RaisedButton label="Add Torrent" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});


