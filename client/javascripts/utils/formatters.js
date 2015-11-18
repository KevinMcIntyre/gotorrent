export function formatBytes(bytes, useBinary) {
    bytes = parseInt(bytes);
    let thresh = useBinary ? 1024 : 1000;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    let units = useBinary
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

export function formatToPercentString(decimal) {
    return (decimal*100.0).toFixed(2) + "%"
}