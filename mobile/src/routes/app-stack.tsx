import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/home';
import GiveClasses from '../pages/give-classes';
import Studytabs from './study-tabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name="Home" component={Home}/>
				<Screen name="GiveClasses" component={GiveClasses}/>
				<Screen name="Study" component={Studytabs}/>
				
			</Navigator>
		</NavigationContainer>
	)
}

export default AppStack;