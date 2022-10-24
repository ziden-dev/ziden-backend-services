import { Container } from 'typedi';

import logger from '../lib/logger';

export function Logger(): ParameterDecorator {
    return (object: any, propertyKey: any, index: number): void => {
        const propertyName = propertyKey ? propertyKey.toString() : '';
        Container.registerHandler({ object, propertyName, index, value: () => logger });
    };
}