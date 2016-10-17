'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import TopNav from 'components/common/TopNav';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

function mapStateToProps(state) {
    return {

    };
}

export class Main extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='application'>
                <TopNav/>
                <Header/>
                <div className="page-wrap">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Main)
