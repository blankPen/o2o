import './index.less';
import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}
/*
 * @Author: MoCheng
 */
export class index extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>login</div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(index)
