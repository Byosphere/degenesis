export function saveFile(data: any, fileName: string) {
    const json = JSON.stringify(data);

    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
        let blob = new Blob([json], { type: "application/json" });
        (window.navigator as any).msSaveOrOpenBlob(blob, fileName);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        let file = new File([json], fileName, { type: "application/json" });
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        a.click();
        setTimeout(() => {
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0);
    }
}