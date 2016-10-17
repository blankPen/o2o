/*
 * @Author: pengzhen
 * @Date:   2016-05-13 16:57:30
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-09-01 16:33:14
 */

import React, {
    Component
} from 'react';
import store from 'store';
import {PageSpinner} from 'component/common/Spinner'


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
            //模拟出loading的效果
            // setTimeout(() => {
            //   component((Component) => {
            //     this.setState({
            //       Component: Component.default
            //     });
            //   });
            // }, 10000);
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
                return loading === false? <div/> : <PageSpinner />;
            }
        }
    });
}
