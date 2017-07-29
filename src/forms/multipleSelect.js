/**
 * Multiple select list with search
 * ataomega@gmail.com
 * www.atasmohammadi.net
 * version 1.0
 */
import React, {Component, PropTypes} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
    TouchableNativeFeedback,
  ScrollView,
    ListView,
  TextInput
} from 'react-native';
let { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

export default class CustomMultiPicker extends Component {
  constructor(props){
    super(props);
      this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
        options:[],
      searchText: null,
      selected: []
    };
  }

  componentDidMount(){
    const {selected,options} = this.props;
    this.setState({options});
    if(selected instanceof Array){

      selected.map(select => {
        this._onSelect(select)
      })
    } else if(selected) {
      this._onSelect(selected)
    }

  }
componentWillReceiveProps(nextProps){

    if(JSON.stringify(nextProps.selected)!==JSON.stringify(this.props.selected)){
          let {selected}=nextProps;
        this.setState({
            selected: selected
        })

    }
}
  getNewDimensions(event){
        let pageHeight = event.nativeEvent.layout.height;
        let pageWidth = event.nativeEvent.layout.width;
        this.setState({
            pageHeight, pageWidth
        })
    }

  _onSelect = (item) => {
    let selected = this.state.selected
    if(this.props.multiple){
      if(selected.indexOf(item) == -1){
        selected.push(item)
        this.setState({
          selected: selected
        })
      } else {
        selected = selected.filter(i => i != item)
        this.setState({
          selected: selected
        })
      }
    } else {
      if(selected.indexOf(item) == -1){
        selected = [item]
        this.setState({
          selected: selected
        })
      } else {
        selected = []
        this.setState({
          selected: selected
        })
      }
    }
    this.props.callback(selected)
  }

  _onSearch = (text) => {
      let {options}=this.props;
   let searchText=text.length > 0 ? text.toLowerCase(): null;
      const _options = searchText? this.filterObjectByValue(options, option => option.label.toLowerCase().includes(searchText)) :options

      this.setState({
          searchText:searchText,options:_options
      })
     // console.log(this.state.options)
  }

  _isSelected = (item) => {
    const selected = this.state.selected
    if(selected.indexOf(item) == -1){
      return false
    }
    return true
  }

  filterObjectByValue = (obj, predicate) => {
   return obj
          .filter( key => predicate(key) )
          //.reduce( (res, key) => (res[key] = obj[key], res), {} )
      //this.setState({options});
  }

  render(){
    const {returnValue } = this.props;
    //const list = this.state.searchText ? this.filterObjectByValue(options, option => option.label.toLowerCase().includes(this.state.searchText)) : options
   // const labels = Object.keys(list).map(i => list[i])
   // const values = Object.keys(list);
    return(
      <View onLayoutx={(evt)=>{this.getNewDimensions(evt)}}>
        {this.props.search && <View style={{ flexDirection: 'row', height: 55 }}>
          <View style={{ marginTop: 15, marginLeft: 15, backgroundColor: 'transparent' }}>
            <Icon name="ios-search-outline" color={this.props.iconColor} size={25}/>
          </View>
          <TextInput
            style={{
              width: this.state.pageWidth-20,
              height: 35,
              margin: 0,
              marginTop: 10,
              marginLeft: -25,
              padding: 5,
              paddingLeft: 30,
              borderColor: this.props.iconColor,
              borderWidth: 1,
              borderRadius: 5,

            }}
            onChangeText={(text) => { this._onSearch(text) }}
            clearButtonMode={'always'}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            underlineColorAndroid={'transparent'}
          />
        </View>}

          {false&&<ScrollView
          style={{ padding: 5,  flex:1}}
        >
          {labels.map((label, index) => {
              //height: this.props.scrollViewHeight||(height-75)
            const itemKey = returnValue == "label" ? label : values[index];
            return(
              <TouchableOpacity
                key={Math.round(Math.random() * 1000000)}
                style={{
                    padding: 7,
                    marginTop: 0,
                    marginLeft: 2,
                    marginRight: 2,
                    marginBottom: 6,
                    backgroundColor: this.props.rowBackgroundColor,
                    height: this.props.rowHeight,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: this.props.rowRadius
                }}
                onPress={(e) => {
                  this._onSelect(itemKey)
                }}
              >

                <Text>{label}</Text>
                {

                  this._isSelected(itemKey) ?
                  <Icon name={this.props.selectedIconName} color={this.props.iconColor} size={this.props.iconSize} />
                  :
                  <Icon name={this.props.unselectedIconName} color={this.props.iconColor} size={this.props.iconSize} />
                }

              </TouchableOpacity>
            )


          })}
        </ScrollView>}
        <ListView
            dataSource={this.ds.cloneWithRows(this.state.options)}
            contentContainerStyle={{ padding: 5,  flex:1}}
            scrollRenderAheadDistanceb={640}
            enableEmptySections={true}
            renderRow={(data) =>{

                const itemKey = returnValue == "label" ? data.label : data.value;
                return(
                    <TouchableOpacity


                        onPress={(e) => {
                            this._onSelect(itemKey)
                        }}
                    >
                        <View style={{
    padding: 7,
    marginTop: 0,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 6,
    backgroundColor: this.props.rowBackgroundColor,
    height: this.props.rowHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: this.props.rowRadius
}}>
                        <Text>{data.label}</Text>
                        {

                            this._isSelected(itemKey) ?
                                <Icon name={this.props.selectedIconName} color={this.props.iconColor} size={this.props.iconSize} />
                                :
                                <Icon name={this.props.unselectedIconName} color={this.props.iconColor} size={this.props.iconSize} />
                        }

                        </View>
                    </TouchableOpacity>
                )
            }}

        >

        </ListView>
      </View>
    )
  }
}
CustomMultiPicker.PropTypes={
    options:PropTypes.arrayOf(PropTypes.shape({label:PropTypes.string.isRequired,value:PropTypes.any})).isRequired,
    returnValue:PropTypes.string
}