import React from 'react';
import * as actions from '../actions';
import {connect} from "react-redux";
import AnimateOnChange from 'react-animate-on-change';
import {Message} from "semantic-ui-react";

class NotificationComponent extends React.Component {
    render() {
        const animation = this.props.animateIn ? "showAndHide" : "";

        return(
            <div id="message-notification">
                
                    <AnimateOnChange
                        baseClassName="animate"
                        animationClassName={animation}
                        animate={true}>
                         <Message
                            success
                            header={this.props.message}
                        />     
                    </AnimateOnChange>
              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.notificationReducer.message,
        animateIn: state.notificationReducer.animateIn
    }
};

export default connect(mapStateToProps, actions)(NotificationComponent);