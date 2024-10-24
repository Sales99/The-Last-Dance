import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ConfigContainerLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1, // Largura da borda
        borderColor: 'black', // Cor da borda
        marginTop: 40,
    },
    containerLogin: {
        display: 'flex',
        // alignItems: 'center',
        height: '100%',
        width: '90%',
        flexDirection: 'column',
        // borderWidth: 1, // Largura da borda
        borderColor: 'black', // Cor da borda
    }, 
    LoginTopo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        width: '100%',
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        marginBottom: '3%',
    },
    LoginTopoImagem:{
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        alignItems: 'center',
    },
    LoginImage: {
        width: 270,
        height: 270,
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        resizeMode: 'contain',
    },
    LoginTopoTitulo: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        alignItems: 'center',
    },
    LoginTopoTituloText: {
        fontSize: 20,
        fontFamily: 'Poppins_800ExtraBold',

    },
    LoginMeio: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    LoginMeioInputs: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '100%',
        marginBottom: 10,
        gap: 0,
    },
    LoginLayoutInputs: {
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
    LoginLayoutInputsText: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        fontSize: 20,
        fontFamily: 'Poppins_800ExtraBold',
    },
    LoginInputSemValor: {
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
    LoginInputComValor: {
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
    LoginInputComValorInvalido: {
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
    LoginLayoutMeioBotão: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '80%',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        
    },
    LoginMeioBotão: {
        backgroundColor: '#88B8DA',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    
    LoginMeioBotaoText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 17,
    },

    EsqueceuSenhaLayout: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: 5,
    },  

    EsqueceuSenhaText: {
        color: '#2779D9',
        fontFamily: 'Poppins_400Regular',
        opacity: 0.5, // Ajuste o valor conforme a necessidade

    },
    
    LoginInferior: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    LoginGoToLogin: {
        // borderWidth: 1, // Largura da borda
        // borderColor: 'black', // Cor da borda
        width: '70%',
        alignItems: 'center',
        paddingVertical: '1%',
        borderWidth: 0,
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    LoginTextoGoToLogin: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
    LoginButtonGoToLogin: {
        color: '#2779D9',
        fontFamily: 'Poppins_400Regular',

    },
    LoginLayoutAuthGoogle: {
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
    LoginTextAuthGoogle: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
})

export default styles;