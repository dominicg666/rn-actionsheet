import React,{ useState } from 'react';
import {StyleSheet, View, Dimensions, Animated, ScrollView, ImageBackground} from  'react-native';
import { ACTIONSHEET_ARROWDOWN, ACTIONSHEET_ARROWUP  } from '../../../assets'
const { width, height } = Dimensions.get('screen');
const imageSrc  = require('./assets/bottom_nav.png');

const ActionSheet = (props) => {
    const { children } =props;
    const [alignment] = useState(new Animated.Value(0));
    const [arrowPossition,setArrowPossition] = useState(false);
    const bringUpActionSheet = () =>{
        Animated.timing(alignment,{
            toValue:1,
            duration:500,
            useNativeDriver:false
        }).start();
    }

    const actionSheetIntropolate = alignment.interpolate({
        inputRange:[0,1],
        outputRange:[-height/1.6+80,0]
    })

    const hideTheActionSheet = () =>{
        Animated.timing(alignment,{
            toValue:0,
            duration:500,
            useNativeDriver:false
        }).start();
    }

    const actionSheetStyle = {
        bottom: actionSheetIntropolate
    }

    const getstureHanlder =(e)=>{
        if(e.nativeEvent.contentOffset.y>0){
            bringUpActionSheet();
            setArrowPossition(true)
        }else if(e.nativeEvent.contentOffset.y<0){
            hideTheActionSheet();
            setArrowPossition(false)
        }
    }
    return (<Animated.View style={[styles.container,actionSheetStyle]}>
        <ImageBackground 
            style={{width:"100%",height:100}}
            width={`100%`}
            height={100}
            source={imageSrc}  
            resizeMode="cover" >
        {/* <View> */}
        <ScrollView style={styles.grabber} onScroll={getstureHanlder}>
            <View style={styles.actionSheetArrow}>
                {arrowPossition?<ACTIONSHEET_ARROWDOWN />:<ACTIONSHEET_ARROWUP />}
            </View>
        </ScrollView>
        {/* </View> */}
        </ImageBackground>
           <View style={styles.body}>
                {children}
           </View>
    </Animated.View>)
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        left:0,
        right:0,
        bottom:0,
        height: height/1.6,
        width:width,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    body:{
        backgroundColor:"#fff",
        height: height/1.6,
        width:"100%"
    },
    image:{
        flex: 1,
        justifyContent: "center"
    },
    grabber:{
        width:60,
        height:60,
        alignSelf:"center",
        backgroundColor:"#3A9EA5",
        borderRadius:30,
        elevation:4,
        marginBottom:40
        // borderTopColor:"#aaa"
    },
    actionSheetArrow:{
        paddingHorizontal:16.5,
        paddingVertical:16
    }
})
export default ActionSheet;