import env from "../../lib/env/index.js";

function getLogoUrl(filename: string): string {
    if (filename == '') return `${env.app.url}/public/assets/img/${filename}`;
    return `${env.app.url}${env.uploads.multerStorageDest}/${filename}`;
}

const utils = {
    getLogoUrl
}

export default utils;