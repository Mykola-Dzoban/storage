import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../../config/firebaseConfig';
import { CustomButtonOutline } from '../ui/CustomButton';

const Profile = ({ route }) => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { userId, setIsLoggedIn } = route.params;
	console.log('user id: ', userId);

	useEffect(() => {
		const fetchData = async (userId) => {
			await users
				.getById(userId)
				.then((res) => {
					setUserData(res);
					setIsLoading(false);
				})
				.catch((err) => console.log(err));
		};
		fetchData(userId);
	}, [userId]);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userBox}>
				<FontAwesome name="user-circle-o" size={60} color="black" />
				<Text style={styles.name}>{userData?.name}</Text>
				<Text>{userData?.email}</Text>
				{userData?.isAdmin && <Text style={styles.admin}>Admin</Text>}
				<CustomButtonOutline title="Logout" onPress={() => setIsLoggedIn(false)} />
			</View>
		</SafeAreaView>
	);
};
export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EDEEF2',
		alignItems: 'center',
	},
	userBox: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		alignItems: 'center',
	},
	name: {
		fontSize: 30,
		fontWeight: '700',
	},
	admin: {
		padding: 5,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: '#bbb',
		borderRadius: 5,
	},
});
