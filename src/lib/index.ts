// place files you want to import through the `$lib` alias in this folder.

export function vizNameToId(vizName: string): string {
    return vizName.toLowerCase().replace(/ /g, '-');
}