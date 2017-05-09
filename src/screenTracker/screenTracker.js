/**
 * Created by ebundala on 5/6/2017.
 */
import { NavigationActions } from 'react-navigation';
import Firestack from 'react-native-firestack';

const firestack = new Firestack();

firestack.analytics.logEventWithName("navigate", {'screen': "initial"})
    .then((res) => {
        console.log('Sent event named initial')
    }).catch((err) => {
    console.log('initial event failed sent')
});

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

const screenTracking = ({ getState }) => next => (action) => {

    if (
        action.type !== NavigationActions.NAVIGATE
        && action.type !== NavigationActions.BACK
    ) {
        return next(action);
    }


    const  currState=getState().nav;
    const result = next(action);
    const nextState=getState().nav;
    requestIdleCallback(()=>{
        const currentScreen = getCurrentRouteName(currState);
        const nextScreen = getCurrentRouteName(nextState);
    if (nextScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        //tracker.trackScreenView(nextScreen);

        console.log('event navigate ',currentScreen,nextScreen);
        firestack.analytics.logEventWithName("navigate", {'screen': nextScreen})
            .then((res) => {
                console.log('Sent event named launch')
            }).catch((err) => {
                console.log('launch event failed sent')
            });

    }})
    return result;
};

export default screenTracking;
