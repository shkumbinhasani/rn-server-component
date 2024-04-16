import {createElement, FC, ReactNode} from "react";
import {Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";

const configToComponent = (config, callbacks) => {
    const {
        type,
        props,
        children
    } = config;
    const newProps = props ? Object.entries(props).reduce((acc, [key, value]) => {
        if (value && typeof value === 'object' && "@clientFn" in value && value['@clientFn'] === true) {

            return {
                ...acc,
                [key]: () => {
                    if (value.event in callbacks && typeof callbacks[value.event] === 'function') {
                        callbacks[value.event](value.payload);
                    }
                }
            }
        }
        return {
            ...acc,
            [key]: value
        };
    }, {}) : {};

    let ComponentType = View;

    if (type === 'Text') {
        ComponentType = Text;
    } else if (type === 'Button') {
        ComponentType = Button;
    } else if (type === 'Image') {
        ComponentType = Image;
    } else if (type === 'TouchableOpacity') {
        ComponentType = TouchableOpacity;
    } else if (type === 'TextInput') {
        ComponentType = TextInput;
    }

    if (!children || typeof children === 'string' || typeof children === 'number') {
        return createElement(ComponentType, newProps, children);
    }
    if (children) {
        return createElement(ComponentType, newProps, ...Array.isArray(children) ? children.map((child) => configToComponent(child, callbacks)) : [configToComponent(children, callbacks)]);
    }
}

export const SC = new Proxy({}, {
    get: function (target, prop, receiver) {
        if (typeof target[prop] === 'undefined') {
            return function (...args) {
                const {data, ...props} = args[0];
                return configToComponent(data, props);
            };
        } else {
            return Reflect.get(target, prop, receiver);
        }
    }
})
