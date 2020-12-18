const React = require('react');
const {useStore, SnipcartContext} = require('./CartStore');

/**
 * @param props : {currency, version}
 */
const SnipcartProvider = props => {
  const [state, dispatch] = useStore();
  const {defaultLang} = props;
  React.useEffect(() => {
    const listenSnipcart = () => {
      document.addEventListener('snipcart.ready', () => {
        dispatch({type: 'setReady', payload: true});
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({type: 'setReady', payload: true});
    } else {
      listenSnipcart();
    }
  }, [props, dispatch, defaultLang]);

  return (
    <SnipcartContext.Provider value={{state}}>
      {props.children}
    </SnipcartContext.Provider>
  );
};

export default SnipcartProvider;