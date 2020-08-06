import React from 'react';
import { View } from 'react-native';


import styles from './styles';
import PageHeader from '../../components/page-header';

function TeacherList() {
	return (
		<View style={styles.container}>
			<PageHeader title="Proffys disponíveis"></PageHeader>
		</View>
	)
}

export default TeacherList;