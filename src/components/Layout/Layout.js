/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import initFirebase from '../../core/firebase/initialize';
import authFirebase from '../../core/firebase/auth';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      showConnected: false,
    };

    this.renderConnectedFirebase = this.renderConnectedFirebase.bind(this);
  }

  componentDidMount() {
    this.initializeFirebase();
  }

  componentWillUnmount() {
    authFirebase.authChangeRef();
  }

  initializeFirebase() {
    // Initialize firebase
    initFirebase.initialize();

    // check connect
    initFirebase.connectedFirebase((resp) => {
      if (resp === true) {
        // check auth
        authFirebase.onAuthStateChanged();

        this.setState({
          connected: true,
          showConnected: true,
        });

        setTimeout(() => {
          this.setState({
            showConnected: false,
          });
        }, 2000);
      } else {
        this.setState({
          connected: false,
          showConnected: true,
        });
      }
    });
  }

  renderConnectedFirebase() {
    const { connected, showConnected } = this.state;

    return (
      (showConnected) ?
        (connected) ?
          <div className={s.connected}>Connect Database!</div>
        :
          <div className={s.disConnected}>Disconnect Database!</div>
      :
        null
    );
  }

  render() {
    return (
      <div>
        {this.renderConnectedFirebase()}
        <Header />
        {this.props.children}
        <Feedback />
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
