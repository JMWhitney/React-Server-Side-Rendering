import React from 'react';
import {connect} from 'react-redux';
import {initialCards} from '../store';
import Link from 'next/link';
import './index.css';
import Card from './Card';

class Index extends React.Component {
  static async getInitialProps({ store }) {
    store.dispatch(initialCards());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link href="/page2">
            <img src="/static/logo.jpg" className="static-logo" alt="logo" />
          </Link>
        </header>
        <div className="Grid">
          {
            //Create an array of cards based on how many cards are returned from the api/database
            this.props.cards.map((card) => (
              <Card key={card.id} />
            ))
          }
        </div>
      </div>
    )
  }
};


export default connect(state => state)(Index);