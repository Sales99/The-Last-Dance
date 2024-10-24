import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ConfigContainerCadastro: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1, // Largura da borda
        borderColor: 'black', // Cor da borda
        marginTop: 40,
    },
    containerCadastro: {
        display: 'flex',
        // alignItems: 'center',
        height: '100%',
        width: '90%',
        flexDirection: 'column',
        // borderWidth: 1, // Largura da borda
        borderColor: 'black', // Cor da borda
    }, 
    cadastroTopo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        width: '100%',
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        marginBottom: '3%',
    },
    cadastroTopoImagem:{
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        alignItems: 'center',
    },
    CadastroImage: {
        width: 270,
        height: 270,
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        resizeMode: 'contain',
    },
    CadastroTopoTitulo: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        alignItems: 'center',
    },
    CadastroTopoTituloText: {
        fontSize: 20,
        fontFamily: 'Poppins_800ExtraBold',

    },
    CadastroMeio: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    CadastroMeioInputs: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        marginBottom: 10,
        gap: 0,
    },
    CadastroLayoutInputs: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        height: 120,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        gap: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    CadastroLayoutInputsText: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        fontSize: 20,
        fontFamily: 'Poppins_800ExtraBold',
    },
    CadastroInputSemValor: {
        height: 45,
        fontFamily: 'Poppins_400Regular',
        borderWidth: 0,
        borderTopWidth: 3,
        borderTopColor: 'black',
        fontSize: 15,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#888888', // cor da sombra
        shadowOffset: { width: 2, height: 2 }, // shadow offset
        shadowOpacity: 0.25, // shadow opacity
        shadowRadius: 4, // shadow radius
        elevation: 2,
        paddingLeft: 10,
        transition: 'opacity 0.3s, border-bottom-width 0.3s, border-bottom-color 0.3s',

    },
    CadastroInputComValor: {
        height: 45,
        fontFamily: 'Poppins_400Regular',
        borderWidth: 0,
        borderTopWidth: 3,
        borderTopColor: 'green',
        fontSize: 15,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#888888', // cor da sombra
        shadowOffset: { width: 2, height: 2 }, // shadow offset
        shadowOpacity: 0.25, // shadow opacity
        shadowRadius: 4, // shadow radius
        elevation: 2,
        paddingLeft: 10,
        transition: 'opacity 0.3s, border-bottom-width 0.3s, border-bottom-color 0.3s',
    },
    CadastroInputComValorInvalido: {
        height: 45,
        fontFamily: 'Poppins_400Regular',
        borderWidth: 0,
        borderTopWidth: 3,
        borderTopColor: 'red',
        fontSize: 15,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#888888', // cor da sombra
        shadowOffset: { width: 2, height: 2 }, // shadow offset
        shadowOpacity: 0.25, // shadow opacity
        shadowRadius: 4, // shadow radius
        elevation: 2,
        paddingLeft: 10,
        transition: 'opacity 0.3s, border-bottom-width 0.3s, border-bottom-color 0.3s',
    },
    CadastroLayoutMeioBotão: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '80%',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        
    },
    CadastroMeioBotão: {
        backgroundColor: '#88B8DA',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    CadastroMeioBotaoText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 17,
    },
    CadastroInferior: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    CadastroGoToLogin: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '70%',
        alignItems: 'center',
        paddingVertical: '1%',
        borderWidth: 0,
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    CadastroTextoGoToLogin: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
    CadastroButtonGoToLogin: {
        color: '#2779D9',
        fontFamily: 'Poppins_400Regular',

    },
    CadastroLayoutAuthGoogle: {
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        // borderWidth: 0,
        // borderTopWidth: 1,
        // borderTopColor: 'gray',
    },
    CadastroTextAuthGoogle: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
})

export default styles;