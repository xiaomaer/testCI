import * as React from 'react';
import Checkbox from '@components/CheckBox';

const CheckboxGroup = Checkbox.Group;

export interface IHomeState {
    checked: boolean;
    checkedList: string[];
}

export default class Home extends React.Component<{}, IHomeState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            checked: false,
            checkedList: []
        };
    }
    handleChange = () => {
        this.setState({
            checked: !this.state.checked
        });
    };
    onChange = (values: string[]) => {
        this.setState({
            checkedList: values
        });
    };

    public render() {
        const plainOptions = ['Apple', 'Pear', 'Orange'];
        const defaultCheckedList = ['Apple', 'Orange'];
        return (
            <div>
                <div>Checkbox使用示例</div>
                <Checkbox id="xiao" name="xxx" value="xxx">
                    label
                </Checkbox>
                <Checkbox
                    defaultChecked={false}
                    checked={this.state.checked}
                    onChange={this.handleChange}
                >
                    label
                </Checkbox>
                <div>CheckboxGroup使用示例：</div>

                <CheckboxGroup
                    defaultValue={defaultCheckedList}
                    options={plainOptions}
                    value={this.state.checkedList}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
