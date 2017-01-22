/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import firebase from 'firebase';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
      showConnected: false
    };

    this._renderConnectedFirebase = this._renderConnectedFirebase.bind(this);
  }

  componentDidMount() {
    this._initializeFirebase();
  }

  _initializeFirebase() {
    const config = {
      apiKey: "AIzaSyBMZ3vyqorK0kT_4xzAR2HoEfRCGkCIBq4",
      authDomain: "showhuay-5f1bc.firebaseapp.com",
      databaseURL: "https://showhuay-5f1bc.firebaseio.com",
      storageBucket: "showhuay-5f1bc.appspot.com",
      messagingSenderId: "175936341076"
    };
    const app = firebase.initializeApp(config);

    this._connectedFirebase()
  }

  _connectedFirebase() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.setState({
          connected: true,
          showConnected: true
        });

        setTimeout(() => {
          this.setState({
            showConnected: false
          });
        }, 2000);
      } else {
        this.setState({
          connected: false,
          showConnected: true
        })
      }
    });
  }

  _renderConnectedFirebase() {
    const { connected, showConnected } = this.state

    if(showConnected) {
      if(connected) {
        return (
          <div className={s.connected}>Connect Database!</div>
        )
      } else {
        return (
          <div className={s.disConnected}>Disconnect Database!</div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this._renderConnectedFirebase()}
        <Header />
        {this.props.children}
        <Feedback />
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
