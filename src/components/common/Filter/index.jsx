import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import {
    Checkbox,
    Radio,
    Cascader
} from 'antd';

function mapStateToProps(state) {
    return {

    };
}
const CheckboxGroup = Checkbox.Group;
const options = [{
    label: '首单立减',
    value: 'Apple'
}, {
    label: '限时优惠',
    value: 'Pear'
}, {
    label: '美团专送',
    value: 'Orange'
}, ];
const list = [{
    title: "全部",
    id: "1"
}, {
    title: "美食",
    id: "2"
}, {
    title: "外卖",
    id: "3"
}, {
    title: "药品",
    id: "4"
}];
const list2 = [{
    title: "默认排序",
    id: "1"
}, {
    title: "价格↑",
    id: "2"
}, {
    title: "价格↓",
    id: "3"
}];

//PC端
export class MoreSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: "1"
        }
    }
    select = (key) => {
        this.setState({
            checked: key
        });
    }
    render() {
        let type = this.props.type || "text";
        let btn;
        if (type == "text") {
            btn = list.map((item, i) => {
                return (
                    <span  key={i}
                        className={this.state.checked==item.id?"childer childer-active":"childer"}
                        onClick={this.select.bind(null,item.id)}>
                        {item.title}
                    </span>
                );
            });
        } else if (type == "checked") {
            btn = <CheckboxGroup options={options} defaultValue={['Pear']}  />;
        } else {
            btn = list2.map((item, i) => {
                return (
                    <span key={i}
                            className={this.state.checked==item.id?"filter filter-active":"filter"}
                            onClick={this.select.bind(null,item.id)}>
                                {item.title}
                    </span>
                );
            });
        }
        return (
            <div className="home-filter">
                {this.props.type!="filter" &&
                    <span className="title">
                        <i className="fa fa-asterisk" />
                        商家分类
                    </span>}
                <span className="list">
                    {btn}
                </span>
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(MoreSearch)
