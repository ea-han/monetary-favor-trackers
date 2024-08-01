import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

// import { DUMMY_FAVORS_OF_PROFILE_Updated } from "../util/dummy-data";
import { useSelector } from "react-redux";
import FavorCard from "../../../components/FavorCard";
import FloatingButton from "../../../components/UI/FloatingButton";
import IconButton from "../../../components/UI/IconButton";
import { GLOBAL_STYLES } from "../../../constants/styles";

function BountiesListScreen() {
	const userBountyList = useSelector((state) => state.bountyList.bountyList);
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<ScrollView style={styles.page}>
				<Text style={styles.mainHeader}>My Bounties</Text>
				<View style={styles.viewSpacing}>
					<View style={styles.filterContainer}>
						<View style={styles.searchBar}>
							<IconButton
								icon="search-circle-outline"
								color={GLOBAL_STYLES.colors.brown700}
								iconSize={28}
								onPress={() => console.log("Filter Button")}
							/>
							<TextInput
								style={styles.textInput}
								placeholder="Search..."
								placeholderTextColor={GLOBAL_STYLES.colors.brown700}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<IconButton
								icon="filter"
								color={GLOBAL_STYLES.colors.brown700}
								iconSize={28}
								onPress={() => console.log("Filter Button")}
							/>
							<IconButton
								icon="swap-vertical-sharp"
								color={GLOBAL_STYLES.colors.brown700}
								iconSize={28}
								onPress={() => console.log("Sort Button")}
							/>
						</View>
					</View>
					{userBountyList.map((favor) => (
						<FavorCard
							key={favor.bountyId}
							onPress={() =>
								navigation.navigate("ViewBounty", { bountyId: favor.bountyId })
							}
							favor={favor}
						/>
					))}
				</View>
			</ScrollView>
			<FloatingButton
				onPress={() => navigation.navigate("CreateBounty")}
				icon="add-sharp"
				color={GLOBAL_STYLES.colors.blue300}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingHorizontal: "10%",
	},
	mainHeader: {
		fontSize: 36,
		fontWeight: "bold",
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
	},
	viewSpacing: {
		marginVertical: 8,
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
		gap: 8,
	},
	searchBar: {
		width: "70%",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 20,
		borderColor: GLOBAL_STYLES.colors.brown700,
		borderWidth: 2,
		backgroundColor: GLOBAL_STYLES.colors.brown400,
		paddingHorizontal: 8,
		// paddingVertical: 1
	},
	textInput: {
		flex: 1,
		color: GLOBAL_STYLES.colors.brown700,
		marginLeft: 8,
		fontSize: 14,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	filterText: {
		fontWeight: "bold",
		fontSize: 16,
		color: GLOBAL_STYLES.colors.blue300,
	},
});

export default BountiesListScreen;
