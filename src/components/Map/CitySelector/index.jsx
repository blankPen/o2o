/*
 * @Author: pengzhen
 * @Date:   2016-10-20 17:58:42
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-21 13:46:38
 */

'use strict';
import './index.less';
import React from 'react';
import cityData from  './city';
import { AutoComplete } from 'antd';

const Option = AutoComplete.Option;
const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default class CitySelector extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
    };
    searchArray = [];
    constructor(props) {
        super(props);
    }
    handleChange=(value)=>{
        this.props.onChange(value);
    }
    renderItems(data=[]){
        return data.map((item)=><li key={item.city_id} >{item.real}</li>);
    }
    renderFields(){
        this.searchArray = [];
        let fields = cityData.map((items,i)=>{
           return (
                <div key={i} className="city-field">
                    <span className="letter">{letter[i]}</span>
                    <ul>
                        {items.map((item)=>{
                            this.searchArray.push(item.real);
                            return <li key={item.city_id}
                                onClick={this.handleChange.bind(this,item.real)}>{item.real}</li>
                        })}
                    </ul>
                </div>
           )
        });

        return fields;
    }
    render() {
        return (
            <div className='city-selector-wrap'>
                <div className="tool-bar">

                    <div className="guess-city">
                        <span>猜你在：</span>
                        <a onClick={this.handleChange.bind(this,this.props.guessCity)}>{this.props.guessCity}</a>
                    </div>
                    <div className="city-search-wrap">
                        <span>直接搜索</span>
                        <AutoComplete
                            style={{ width: 200 }}
                            dataSource={this.searchArray}
                            handleSelect={this.handleChange}
                        />
                    </div>
                </div>
                {this.renderFields()}
            </div>
        );
    }
}
