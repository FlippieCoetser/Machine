const importmap = {
    imports: {
        "@browser-modules/dictionary":
            "./node_modules/@browser-modules/dictionary/lib/dictionary.js",
        "@browser-modules/events":
            "./node_modules/@browser-modules/events/lib/events.js"
    },
};

const injectImportmap = (importmap) => {
    const element = document.createElement("script");
    element.type = "importmap";
    element.textContent = JSON.stringify(importmap);
    document.currentScript.after(element);
}

injectImportmap(importmap)