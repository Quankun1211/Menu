import { StyleSheet } from 'react-native';

export const RegionStyles = StyleSheet.create({
    container: {
        paddingTop: 15,
        flex: 1,
        backgroundColor: '#fff',
    },
    tabWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#e8eaed',
        borderRadius: 100,
        padding: 4, 
        marginVertical: 15,
        width: '100%', 
    },
    tabItem: {
        flex: 1, 
        paddingVertical: 10,
        paddingHorizontal: 2, 
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabItem: {
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7A869A',
        textAlign: 'center', 
        width: '100%',
    },
    activeTabText: {
        color: '#F26522',
    },
});