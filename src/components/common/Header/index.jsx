import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';

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
                    <Link to='/' className='left-logo'>
                        <img 
                            src="http://waimai.meituan.com/static/img/logos/normal-new2.png" 
                            alt="商标"
                        />
                    </Link>
                </div>
            </header>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Header)
