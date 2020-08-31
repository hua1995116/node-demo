export function downloadDirect(url) {
    const aTag = document.createElement('a');
    aTag.download = url.split('/').pop();
    aTag.href = url;
    aTag.click()
}

export function downloadByContent(content, filename, type) {
    const aTag = document.createElement('a');
    aTag.download = filename;
    const blob = new Blob([content], { type });
    const blobUrl = URL.createObjectURL(blob);
    aTag.href = blobUrl;
    aTag.click();
    URL.revokeObjectURL(blob);
}

export function downloadByDataURL(content, filename, type) {
    const aTag = document.createElement('a');
    aTag.download = filename;
    const dataUrl = `data:${type};base64,${window.btoa(unescape(encodeURIComponent(content)))}`;
    aTag.href = dataUrl;
    aTag.click();
}

export function downloadByBlob(blob, filename) {
    const aTag = document.createElement('a');
    aTag.download = filename;
    const blobUrl = URL.createObjectURL(blob);
    aTag.href = blobUrl;
    aTag.click();
    URL.revokeObjectURL(blob);
}

export function base64ToBlob(base64, type) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const buffer = Uint8Array.from(byteNumbers);
    const blob = new Blob([buffer], { type });
    return blob;
}
