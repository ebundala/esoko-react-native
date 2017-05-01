/**
 * Created by ebundala on 2/28/2017.
 */

import React from 'react';

import {
    StyleSheet

    } from 'react-native';
import { typography, color } from 'react-native-material-design-styles';
export const typographyStyle = StyleSheet.create(typography);
export const colorStyle=StyleSheet.create(color)
export const colours=color
const  styles=StyleSheet.create({
    iconColor:{
        color:color.paperTeal500.color
    },
    navBarBackground:{
        backgroundColor:color.paperBlue400.color
    },
    //layouts
    horizontal:{
        flexDirection:"row",
       // flex:1,
        //backgroundColor:"grey"
    },
    vertical:{
        flexDirection:"column"
        ,
       // flex:1,
        //backgroundColor:"yellow"

    },

    //flex factors
    flex1:{
        flex:1
    },
    flex2:{
        flex:2
    },
    flex3:{
        flex:3
    },
    flex4:{
        flex:4
    },
    flex5:{
        flex:5
    },
    flex6:{
        flex:6
    },
    flex7:{
        flex:7
    },
    flex8:{
        flex:8
    },
    flex9:{
        flex:9
    },
    flex10:{
        flex:10
    },
    flex11:{
        flex:11
    },
    flex12:{
        flex:12
    },

    //content justify
    spaceBetween:{
        justifyContent: 'space-between'
    },
    flexStart:{
        justifyContent: 'flex-start'
    },
    flexEnd:{
        justifyContent: 'flex-end'
    },
    spaceAround:{
        justifyContent:'space-around'
    },
    centerJustified:{
        justifyContent: 'center'
    },
    //align item in container
    /*alignItemBaselineCN:{
        alignItems:'baseline'
    },*/
    alignItemsStart:{
        alignItems:'flex-start'
    },
    alignItemsEnd:{
        alignItems:'flex-end'
    },
    alignItemsCenter:{
        alignItems:'center'
    },
    alignItemsStretch:{
        alignItems:'stretch'
    },
red:{backgroundColor:"red"},
    yellow:{
        backgroundColor:"yellow"
    },
    //align content in container
    /*alignContentStartCN:{
        alignContent:"flex-start"
    },
    alignContentEndCN:{
        alignContent:"flex-end"
    },
    alignContentCenterCN:{
        alignContent:"center"
    },
    alignContentStretchCN:{
        alignContent:"stretch"
    },
    alignContentSpaceBetweenCN:{
        alignContent:"space-between"
    },
    alignContentSpaceAroundCN:{
        alignContent:"space-around"
    },*/

    //children properties

    flexWrap:{
        flexWrap:"wrap"
    },
    flexGrow:{
        flexGrow:1
    },
    flexShrink:{
        flexShrink:1
    },
    flexBasis:{
        flexBasis:1
    },
    alignSelfStart:{
        alignSelf:"flex-start"
    },
    alignSelfEnd:{
        alignSelf:"flex-end"
    },
    row:{
        // flex:2,

        //alignItems: 'center',
        // backgroundColor:'green',
        height:50,
        //width:260

    }
    ,

    input:{
        // flex: 4,
        paddingHorizontal: 10,
        // height:40,
    },
    title:{
        fontSize:14,
        fontWeight:"bold",
        color:"rgb(50,60,63)",
        textAlign:"center"
    },
productTitle:{
        textAlign:"center",
    marginHorizontal:4,
    fontSize:12,
    fontWeight:"bold",
    color:"rgb(50,60,63)",
    overflow:"hidden"
    },
    currency:{
        textAlign:"center",
        marginHorizontal:4,
        fontSize:10,
        color:"rgb(50,60,63)"
    },
    price:{
        textAlign:"center",
        marginHorizontal:4,
        fontSize:10,
        color:"rgb(50,60,63)"
    },
    google:{
        backgroundColor:'red',
    },
    facebook:{
        // backgroundColor:'green',
    },
    twitter:{
        backgroundColor:'blue',
    },
    instagram:{
        backgroundColor:'brown',
    }
})


export default styles;