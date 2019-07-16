import * as React from 'react';

export interface ICheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    className?: string;
    style?: object;
    value?: any;
    autoFocus?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onClick?: () => void;
}
export interface ICheckboxState {
    checked: boolean;
}
export default class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
    static Group: any;
    static defaultProps = {
        className: '',
        style: {},
        defaultChecked: false,
        onChange() {}
    };
    static getDerivedStateFromProps(props: ICheckboxProps, state: ICheckboxState) {
        if (props.checked !== undefined) {
            return {
                ...state,
                checked: props.checked
            };
        }
        return null;
    }
    public input: any;
    constructor(props: ICheckboxProps) {
        super(props);
        this.state = {
            checked: props.checked !== undefined ? props.checked : !!props.defaultChecked
        };
        this.input = React.createRef();
    }
    focus() {
        this.input.current.focus();
    }

    blur() {
        this.input.current.blur();
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { disabled, onChange } = this.props;
        if (disabled) {
            return;
        }
        if (this.props.checked === undefined) {
            this.setState({
                checked: e.target.checked
            });
        }
        onChange && onChange(e);
    };
    public render() {
        const { className, style, checked, children, onChange, ...rest } = this.props;
        return (
            <div className={className} style={style}>
                <input
                    {...rest}
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    ref={this.input}
                />
                <span>{children}</span>
            </div>
        );
    }
}
