import axios from "axios";
import fs from 'fs';

import env from "../../lib/env/index.js";
import { DefaultEndpoint } from '../../lib/constants/index.js';

function getLogoUrl(filename: string): string {
    if (
        filename == '' || !fs.existsSync(`.${env.uploads.multerStorageDest}/${filename}`)
    ) return `${env.app.url}/public/assets/img/default-logo.png`;

    return `${env.app.url}${env.uploads.multerStorageDest}/${filename}`;
}

function getDefaultUrl(type: DefaultEndpoint, hostname: string, id: string): string {
    switch (type) {
        case DefaultEndpoint.Issuer:
            return DefaultEndpoint.Issuer
                .replace('<hostname>', hostname);
        case DefaultEndpoint.SchemaRegistry:
            return DefaultEndpoint.SchemaRegistry
                .replace('<hostname>', hostname)
                .replace('<registryId>', id);
        case DefaultEndpoint.Service:
            return DefaultEndpoint.Service
                .replace('<hostname>', hostname)
                .replace('<serviceId>', id);
    }
}

async function fetchSchemaContext(json: any) {
    const contexts = json['@context'];
    if (contexts === undefined || contexts.length == 0) return json;

    json['@context'] = await Promise.all(contexts.map(async (context: string|object) => {
        if (typeof context == 'string') {
            return await fetchSchemaContext((await axios.get(context)).data);
        } else if (typeof context == 'object') {
            return context;
        }
    }));

    json['@context'].map((context: any) => {
        if (context['@context']) {
            json['@context'].push(context['@context']);
            Object.assign(context, {'@context': []});
        }
    })

    json['@context'] = json['@context'].flat();
    return json;
}

function camel2Title(camelText: string): string {
    const separated = camelText.replace(/([A-Z])/g, " $1");
    return separated.charAt(0).toUpperCase() + separated.slice(1);
}

function parseBigInt(val: Array<any>) {
    let res = [];
    for (let i = 0; i < val.length; i++) {
        res.push(BigInt(val[i]));
    }
    return res;
}

const utils = {
    getLogoUrl,
    getDefaultUrl,
    fetchSchemaContext,
    camel2Title,
    parseBigInt
}

export default utils;