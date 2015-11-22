var app = require('app'),
    Menu = require('menu'),
    BrowserWindow = require('browser-window'),
    Dialog = require('dialog'),
    Shell = require('shell'),
    Promise = require('bluebird'),
    net = require('net'),
    ipc = require('ipc'),
    spawn = require('child_process').spawn,
    path = require('path'),
    fs = require('fs'),
    mainWindow = null,
    socket = null,
    gotorrent = null;

require('crash-reporter').start();

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 800, height: 600, "min-width": 800});
    initMenu(mainWindow);
    mainWindow.loadUrl('file://' + __dirname + '/public/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    var connect = function () {
        var spawnTorrentServer = function () {
            return new Promise(function (resolve, reject) {
                var child = spawn("./gotorrent", [], {
                    cwd: path.resolve(process.cwd(), '../src/')
                });
                if (child.pid != undefined) {
                    resolve(child);
                } else {
                    reject("Error while spawning child process.");
                }
            });
        };
        return new Promise(function (resolve, reject) {
            spawnTorrentServer()
                .then(function (torrentServer) {
                    gotorrent = torrentServer;
                })
                .then(function () {
                    gotorrent.stdout.on('data',
                        function (data) {
                            data = JSON.parse(data.toString('utf8'));
                            mainWindow.webContents.send("torrent-update", data);
                        }
                    );

                    gotorrent.stderr.on('data',
                        function (data) {
                            console.log("GOLANG-ERROR: " + data.toString('utf8'));
                        }
                    );
                })
                .then(function () {
                    ipc.on('start-torrent', function (event, torrent) {
                        request = {
                            "id": "start-torrent",
                            "body": {
                                "id": torrent.id,
                                "path": torrent.path,
                                "isMagnet": torrent.isMagnet
                            }
                        };
                        gotorrent.stdin.write(JSON.stringify(request) + "\n");
                    });

                    ipc.on('stop-torrent', function (event, torrentId) {
                        request = {
                            "id": "stop-torrent",
                            "body": {
                                "id": parseInt(torrentId)
                            }
                        };
                        gotorrent.stdin.write(JSON.stringify(request) + "\n");
                    });

                    ipc.on('open-torrent', function (event, arg) {
                        openTorrentDialog(mainWindow);
                    });

                    ipc.on('open-folder', function (event, arg) {
                        Shell.openItem(arg)
                    });
                })
                .catch(function (err) {
                    console.log("Error while spawning torrent server.", err);
                    if (gotorrent != undefined) {
                        gotorrent.kill();
                        connect();
                    }
                });
        });
    };

    connect()
        .then(function () {
            console.log("swag");
        });

    process.on("uncaughtException", function (err) {
        console.log(err);
        //var killProcess = function() {
        //    return new Promise(function(resolve) {
        //        gotorrent.kill();
        //        resolve();
        //    });
        //};
        //function reconnect(socket) {
        //    killProcess()
        //    .then(function() {
        //        fs.unlinkSync();
        //    })
        //    .then(function() {
        //        connect();
        //    }).catch(function() {
        //        reconnect(socket);
        //    });
        //}
        //if (err.code == "ECONNREFUSED") {
        //    reconnect(err.address);
        //}
        //if (err.code == "ENOENT") {
        //    killProcess()
        //    .finally(function() {
        //        connect();
        //    });
        //} else {
        //    console.log("Uncaught error..", err);
        //}
    })
});

function openTorrentDialog(window) {
    Dialog.showOpenDialog(window, {
        title: "Open a torrent file",
        filters: [{name: 'Torrents', extensions: ['torrent']}],
        properties: ['openFile', 'multiSelections']
    }, function (fileNames) {
        launchTorrentDownloads(fileNames);
    });
}

function launchTorrentDownloads(files) {
    mainWindow.webContents.send("add-torrent-files", files);
}

function initMenu(window) {
    var menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Torrent File',
                    accelerator: 'CmdOrCtrl+O',
                    click: function () {
                        openTorrentDialog(window);
                    }
                },
                {
                    label: 'Open Magnet Link',
                    accelerator: 'CmdOrCtrl+U',
                    click: function () {
                        mainWindow.webContents.send("event", "open-magnet");
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: (function () {
                        if (process.platform == 'darwin')
                            return 'Ctrl+Command+F';
                        else
                            return 'F11';
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: (function () {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                }
            ]
        },
        {
            label: 'Window',
            role: 'window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                }
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: function () {
                        require('shell').openExternal('http://electron.atom.io')
                    }
                }
            ]
        }
    ];

    if (process.platform == 'darwin') {
        var name = require('app').getName();
        menuTemplate.unshift({
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function () {
                        app.quit();
                    }
                },
            ]
        });
        // Window menu.
        menuTemplate[3].submenu.push(
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        );
    }

    var menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}
