export interface Texts {
    [key: string]: any;
}
function importAll(r: __WebpackModuleApi.RequireContext) {
    let texts: Texts = {};
    r.keys().forEach((item) => {
        const splitItem = item.split("/");
        texts[splitItem[splitItem.length-2]] = r(item);
    });
    return texts;
}

export const navigatorTexts = importAll(require.context('./navigator/', true, /\.md/));
export const calculatorTexts = importAll(require.context('./calculator/', true, /\.md/));
