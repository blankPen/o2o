/*
 * @Author: pengzhen
 * @Date:   2016-05-13 16:57:30
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-01 10:25:59
 */

import React from 'react';

/**
 * 异步的组件
 */
export default function asyncLoader(component,loading) {

    return React.createClass({
        getInitialState() {
            return {
                Component: null
            }
        },
        componentDidMount() {
            component((Component) => {
                this.setState({
                    Component: Component.default || Component
                });
            });
        },


        render() {
            var Component = this.state.Component;
            if (Component) {
                return <Component {...this.props}/>
            } else {
                return <div/>;
            }
        }
    });
}
