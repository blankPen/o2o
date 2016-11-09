'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import Img from 'common/Img';
import {
  Link
} from 'react-router';

export default class Download extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="download">
                <div className="neirong">
                    <Link className="returnHome" to={"/"}><i className="fa fa-home"></i>返回首页</Link>
                    <div className="back"  style={{"backgroundImage":"url(../../images/download_1.jpg)"}}></div>
                    <div className="qrcode">
                        <span className="imgK">
                            <span className="imgtip">ios</span>
                            <Img src="ios.png" isShow={true} />
                        </span>
                        <span className="imgK">
                            <span className="imgtip">android</span>
                            <Img src="https://static.pgyer.com/app/qrcode/pjq4" isShow={true} />
                        </span>
                    </div>
                </div>

            </div>
            );
    }
}
