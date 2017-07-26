/**
 * Created by ebundala on 4/5/2017.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback,
    Button,
    ScrollView,
    Image,
    ListView
} from 'react-native';
import {Divider} from "react-native-material-design"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from  "../../products/products.actions"
import {DB} from "../../utils/database"
import styles, {typographyStyle,colorStyle,colours} from "../../styles/styles"


class navigationViewContainer extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        let {queryProducts, root}=this.props;
        let {navigate}=this.props.navigation;
        return (


            <View style={[styles.flex1]}>
                <View style={[styles.flex2]}>
                    <Image style={[styles.flex1,styles.centerJustified,{resizeMode:Image.resizeMode.cover,margin:0}]} source={require("../../pngs/backgroundNuts.jpeg")}>
                        <View style={[styles.flexStart, styles.yellow, {
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginHorizontal: 16
                        }]}>

                        </View>
                    </Image>

                </View>
                <Divider/>
                <View style={[styles.centerJustified,{height:50}]}>
                <TouchableNativeFeedback style={[styles.flex1]} onPress={() => {
                    root.closeDrawer();
                    setTimeout(() => {
                        navigate("createProduct")
                    }, 16)
                }}>
                    <View style={[]}>
                        <Text style={[colorStyle.paperGrey900,{fontSize: 16, paddingHorizontal: 16, fontWeight: "bold",}]}>Sell Your Items</Text>
                    </View>
                </TouchableNativeFeedback>
                </View>
                <Divider/>
                <View style={[styles.flex8]}>


                </View>
                <Divider/>
                <View style={[styles.flex3, styles.spaceAround, {}]}>
                    <TouchableNativeFeedback onPress={() => {root.closeDrawer();}}>
                    <View style={[]}>
                         <Text style={[colorStyle.paperGrey900,{fontSize: 16,paddingHorizontal: 16, fontWeight: "bold",}]}>Settings</Text>
                    </View>
                </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => {root.goToAccount();}}>
                    <View style={[]}>
                     <Text style={[colorStyle.paperGrey900,{fontSize: 16, paddingHorizontal: 16, fontWeight: "bold",}]}>Account</Text>
                    </View>
                    </TouchableNativeFeedback>

                </View>
            </View>



        )
    }



}


class categoryViewContainer extends Component {

    constructor(props) {
        super(props);



this.state={categories:[]};

       // let that=this;


        DB.query("SELECT c.term_taxonomy_id,t.term_id,t.name,t.slug,c.taxonomy,c.parent FROM "+DB.term_taxonomy+" c JOIN "+DB.terms+" t ON c.term_id=t.term_id WHERE c.parent=(SELECT term_id FROM "+DB.terms+" WHERE name='anywhere')" ).then((res)=>{

          //  for(let j=0;j<res.rows.length;j++){
            //   console.log(res.rows.item(j))
           // }
            //that.categories=res.raws.raw();
            if(res.rows.length>0)
           this.setState({categories:res.rows.raw()});
            //debugger;
        })


        this.ds =new ListView.DataSource({/*getSectionData:(dataBlob,sectionID)=>{
            return dataBlob[sectionID];
        },getRowData:(dataBlob,sectID,rowID)=>{
            debugger;
            let row;
            if(dataBlob.hasOwnProperty("rows")) {
                row = dataBlob.rows.item(0);

                return row;
            }

        },*/rowHasChanged:(x,y)=>x!==y});
    }


    render() {

        let {categories,navigate}=this.props;
        //let {navigate}=this.props.navigation;
        //console.log(this.props)
        return (


            <View style={[styles.flex1,{backgroundColor:"white"}]}>





                <ListView dataSource={this.ds.cloneWithRows(this.state.categories)}
                          renderSeparator={(i,j)=><Divider key={j+"divider"+i}/>}
                          enableEmptySections={true}
                          renderRow={(category,sectionID, rowID, highlightRow) =>
                              <View key={rowID}>
                                  <TouchableNativeFeedback  onPress={() => {
                                      navigate("products", {category});
                                  }}>
                                      <View style={[{
                                          height: 50,
                                          marginVertical: 2,
                                          //marginHorizontal:16,

                                          // elevation:2,
                                          //backgroundColor:"lime"
                                      },
                                          //styles.yellow,
                                          //styles.alignItemsCenter,
                                          styles.centerJustified
                                      ]}>
                                          <Text style={[
                                              colorStyle.paperGrey900,
                                              {
                                                  fontSize: 16,
                                                  paddingHorizontal: 16,
                                                  //fontWeight:"500",

                                              }]}>{category?category.slug:""}</Text>
                                      </View>
                                  </TouchableNativeFeedback>

                              </View>


                          }
                />


            </View>



        )
    }



}


const mapStateToProps = (state) => {
    "use strict";

        return{
            categories:state.categories
        }
}


const mapDispatchToProps = (dispatch) => {
    "use strict";
    return bindActionCreators(actions, dispatch)
}
const mergeProps=()=>{}


export default  navigationView = connect(mapStateToProps, mapDispatchToProps)(navigationViewContainer);

export const CategoryView = connect(mapStateToProps, mapDispatchToProps)(categoryViewContainer);
