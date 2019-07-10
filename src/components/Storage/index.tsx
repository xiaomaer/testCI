/**
 * @module: <Storage/> component will be to save/load the state of a component with localStorage
 * @author: mamy
 * @since: 2018-04-10 10:32:52
 */
import * as React from 'react';

export interface StorageProps {
    render: Function;
}

export interface StorageState {
    localStorageAvailable: boolean;
}

export default class Storage extends React.Component<StorageProps, StorageState> {
    constructor(props: StorageProps) {
        super(props);

        this.state = {
            localStorageAvailable: false
        };
    }

    componentDidMount() {
        this.checkLocalStorageExists();
    }
    checkLocalStorageExists() {
        const testKey = 'test';
        try {
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            this.setState({
                localStorageAvailable: true
            });
        } catch (err) {
            this.setState({
                localStorageAvailable: false
            });
        }
    }
    load = (key: string) => {
        if (this.state.localStorageAvailable) {
            return localStorage.getItem(key);
        }
        return null;
    };
    save = (key: string, data: string) => {
        if (this.state.localStorageAvailable) {
            localStorage.setItem(key, data);
        }
    };
    remove = (key: string) => {
        if (this.state.localStorageAvailable) {
            localStorage.removeItem(key);
        }
    };
    render() {
        return (
            <span>
                {this.props.render({
                    load: this.load,
                    save: this.save,
                    remove: this.remove
                })}
            </span>
        );
    }
}
