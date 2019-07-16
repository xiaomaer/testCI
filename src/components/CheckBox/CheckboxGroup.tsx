import * as React from 'react';
import CheckBox from './CheckBox';
export interface ICheckboxGroupProps {
    defaultValue?: string[];
    disabled?: boolean;
    name?: string;
    options?: string[];
    value?: string[];
    onChange?: (value: string[]) => void;
}

export interface ICheckboxGroupState {
    value: string[];
}

export default class CheckboxGroup extends React.Component<
    ICheckboxGroupProps,
    ICheckboxGroupState
> {
    static defaultProps = {
        defaultValue: [],
        disabled: false,
        options: [],
        value: []
    };
    static getDerivedStateFromProps(props: ICheckboxGroupProps, state: ICheckboxGroupState) {
        if (props.value !== undefined) {
            return {
                ...state,
                value: props.value
            };
        }
        return null;
    }
    constructor(props: ICheckboxGroupProps) {
        super(props);

        this.state = {
            value: props.value && props.value.length !== 0 ? props.value : props.defaultValue || []
        };
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const checkList = [...this.state.value];
        const index = this.state.value.indexOf(value);
        if (index > -1) {
            checkList.splice(index, 1);
        } else {
            checkList.push(value);
        }
        this.props.onChange && this.props.onChange(checkList);
    };
    renderOptions = () => {
        const value = this.state.value;
        const { options = [], defaultValue, onChange, ...rest } = this.props;
        return options.map((option) => {
            const isChecked = value.includes(option);
            return (
                <CheckBox
                    {...rest}
                    key={option}
                    value={option}
                    checked={isChecked}
                    onChange={this.handleChange}
                >
                    {option}
                </CheckBox>
            );
        });
    };

    public render() {
        return <div>{this.renderOptions()}</div>;
    }
}
