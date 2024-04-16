import {ButtonProps, ImageProps, TextProps, ViewProps} from "react-native";

abstract class Component {
    static type: string
    props: any
    children?: ComponentChildren

    constructor(args: {
        props?: any
        children?: ComponentChildren
    }) {
        this.props = args.props
        this.children = args.children
    }
}

type ComponentChildren = Component[] | Component | string | number

type ReplaceFunction<T> = {
    [P in keyof T]: T[P] extends Function ? T[P] | {
        "@clientFn": true
        event: string
        payload: any
    } : T[P]
}

class View extends Component {
    type = 'View'

    constructor(args: {
        props?: ReplaceFunction<ViewProps>
        children?: ComponentChildren
    }) {
        super(args)
    }
}

class Text extends Component {
    type = 'Text'

    constructor(args: {
        props?: ReplaceFunction<TextProps>
        children?: ComponentChildren
    }) {
        super(args)
    }
}

class Button extends Component {
    type = 'Button'

    constructor(args: {
        props?: ReplaceFunction<ButtonProps>
        children?: ComponentChildren
    }) {
        super(args)
    }
}

class Image extends Component {
    type = 'Image'

    constructor(args: {
        props?: ReplaceFunction<ImageProps>
        children?: ComponentChildren
    }) {
        super(args)
    }
}

function clientFn(event: string, payload: any) {
    return {
        "@clientFn": true as const,
        event,
        payload,
    }
}

export default eventHandler((request) => {
    return new View({
        props: {
            style: {
                display: 'flex',
                flexDirection: 'row',
                height: 100,
            }
        },
        children: [
            new View({
                props: {
                    style: {
                        backgroundColor: 'red',
                        height: 100,
                        flex: 1,
                    }
                },
                children: new Text({
                    props: {
                        style: {
                            color: 'white',
                        }
                    },
                    children: 'Hello Worldddd'
                })
            }),
            new View({
                props: {
                    style: {
                        backgroundColor: 'blue',
                        height: 100,
                        flex: 1,
                    }
                },
                children: [
                    new Image({
                        props: {
                            source: {
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            },
                            height: 50,
                            width: 50,
                            style: {
                                height: 50,
                                width: 50,
                            }
                        }
                    }),
                    new Button({
                        props: {
                            title: 'Press Me',
                            onPress: clientFn('buttonPress', {})
                        }
                    })
                ]
            }),
        ]
    })
})
