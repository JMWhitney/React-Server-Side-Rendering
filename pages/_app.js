import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore, initialCards, addItem } from '../store';

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {

      // we can dispatch from here too
      ctx.store.dispatch({type: 'FOO', payload: 'foo'});

      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

      return {pageProps};

  }

  render() {
      const {Component, pageProps, store} = this.props;
      return (
          <Container>
              <Provider store={store}>
                  <Component {...pageProps} />
              </Provider>
          </Container>
      );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    initialCards: bindActionCreators(initialCards, dispatch),
    addItem: bindActionCreators(addItem, dispatch)
  }
}

const mapStateToProps = (state) => {
  return{
    cards: state.cards,
  }
}

export default withRedux(initStore)(MyApp);