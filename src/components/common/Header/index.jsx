import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

export class Header extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <div className="header-content">
                    Header
                </div>
            </header>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Header)
