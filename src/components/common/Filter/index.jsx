import React from 'react';
import './index.less';
import { Checkbox } from 'antd';
import {
    connect
} from 'react-redux';
// import DeviceUtils from 'common/DeviceUtils.jsx';
import { Cascader } from 'antd';
function mapStateToProps(state) {
    return {

    };
}
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: '首单立减', value: 'Apple' },
  { label: '限时优惠', value: 'Pear' },
  { label: '美团专送', value: 'Orange' },
];
const list=[
            {title:"全部",id:"1"},
            {title:"美食",id:"2"},
            {title:"外卖",id:"3"},
            {title:"药品",id:"4"}
            ];
//PC端
export class MoreSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            checked:"1"
        }
    }
    select=(key)=>{
        this.setState({
            checked:key
        });
    }
    render() {
        let type=this.props.type||"text";
        let btn;
        if(type=="text"){
            btn=list.map((item,i)=>{
                            return (<span  key={i} 
                                        className={this.state.checked==item.id?"childer childer-active":"childer"} 
                                        onClick={this.select.bind(null,item.id)}>
                                        {item.title}</span>);
                        });
        }else{
            btn=(<CheckboxGroup options={options} defaultValue={['Pear']}  />);
        }
        return(
            <div className="screen">
                <span className="title">
                    <i className="fa fa-asterisk" />
                    商家分类
                </span>
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
