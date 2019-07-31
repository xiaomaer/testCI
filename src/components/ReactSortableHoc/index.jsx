import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import CheckBox from '../CheckBox';

const SortableItem = SortableElement(({ item, onChange }) => (
    <CheckBox value={item.value} checked={item.checked} onChange={onChange}>
        {item.value}
    </CheckBox>
));

const SortableList = SortableContainer(({ items, onChange }) => {
    return (
        <ul>
            {items.map((item, index) => (
                <SortableItem key={`item-${index}`} index={index} item={item} onChange={onChange} />
            ))}
        </ul>
    );
});

export default class SortableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    value: '1',
                    checked: false
                },
                {
                    value: '2',
                    checked: false
                },
                {
                    value: '3',
                    checked: true
                }
            ]
        };
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex)
        }));
    };
    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const checked = target.checked;
        const newItems = this.state.items.map((item) => {
            if (item.value === value) {
                return {
                    ...item,
                    checked
                };
            }
            return item;
        });
        this.setState({
            items: newItems
        });
    };
    render() {
        return (
            <SortableList
                items={this.state.items}
                onSortEnd={this.onSortEnd}
                onChange={this.handleChange}
            />
        );
    }
}
