/**
 * Created by ebundala on 5/6/2017.
 */
import { NavigationActions } from 'react-navigation';
import Firestack from 'react-native-firestack';

const tracker = new Firestack;
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

    const currentScreen = getCurrentRouteName(getState().navigation);
    const result = next(action);
    const nextScreen = getCurrentRouteName(getState().navigation);
    if (nextScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        //tracker.trackScreenView(nextScreen);
        tracker.analytics.logEventWithName("launch", {
            'screen': nextScreen
        }).then(res => console.log('Sent event named launch'))
            .catch(err => console.log('launch event failed sent'));
    }
    return result;
};

export default screenTracking;
