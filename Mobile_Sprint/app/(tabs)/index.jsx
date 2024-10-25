import { View, Text, StyleSheet } from 'react-native'
const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles .text}>Totis</Text>
        </View>
    )
}
export default App;

const styles  = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',

        },
        text: {
            color: 'white',
            fontSize: 42,
            fontWeight: 'bold',
            textAlign: 'center',
            
        }
    }
)