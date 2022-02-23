import React from 'react';
import axios from 'axios';


const Track = WrappedComponent => {
  return class InteractionsTracker extends React.Component {
    onClick = (eventName, widgetName) => {
      console.log({
        element: this.props.eventName,
        widget: this.props.widgetName,
        time: new Date().toString()
      })
      // axios.post('/api/interactions', {
      //   element: this.props.eventName,
      //   widget: this.props.widgetName,
      //   time: new Date().toString()
      // })
      // .then(() => console.log('interactions was sent'))
      // .catch((err) => console.log('Error occurred', err))
    }


    render() {
      return (

        <WrappedComponent {...this.props} onClick={onClick}/>
      )
    }
  }
}
export default Track
