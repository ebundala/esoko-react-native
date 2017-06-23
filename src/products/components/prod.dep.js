/**
 * Created by ebundala on 6/23/2017.
 */
let WidgetMixin = require('react-native-gifted-form/mixins/WidgetMixin.js');


const MultOptionWidget = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {

        return ({
            // onChange: null,
            type: 'MultOptionWidget',

        });
    },

    /*getInitialState(){
     return {value:{false}
     },*/
    componentDidMount() {
        // get value from prop
        if (typeof this.props.value !== 'undefined') {
            this._setValue(this.props.value);
            return;
        }
        // get value from store
        let formState = GiftedFormManager.stores[this.props.formName];
        if (typeof formState !== 'undefined') {
            if (typeof formState.values[this.props.name] !== 'undefined') {
                console.log(this.props.name + " form " + formState.values[this.props.name])
                // console.log(formState)
                this.setState({
                    value: formState.values[this.props.name],

                });
                this._validate(formState.values[this.props.name]);
            }
        }
    },

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
            this.onChange(nextProps.value);
        }
    },
    setValue(value) {
        this.setState({
            value: value,
        });
        GiftedFormManager.updateValue(this.props.formName, this.props.name, value);
    },

    onChange(value, onChangeText = true) {
        if (onChangeText === true) {
            //should maintain similar API to core TextInput component
            this.props.onChangeText && this.props.onChangeText(value);
        }

        this.setValue(value);
        this._validate(value);

        this.props.onValueChange && this.props.onValueChange();
        // @todo modal widgets validation - the modalwidget row should inform about validation status
    },


    _renderCheckmark() {
        //console.log(this.state.value)
        if (this.state.value === true) {
            return (
                <Image
                    style={this.getStyle('checkmark')}
                    resizeMode={Image.resizeMode.contain}
                    source={require('react-native-gifted-form/icons/check.png')}
                />
            );
        }
        return null;
    },

    _onClose() {

        if (this.props.multiple === false) {
            this.props.unSelectAll();
            this._onChange(true);

            if (typeof this.props.onSelect === 'function') {
                // console.log('onSelect');
                this.props.onSelect(this.props.value);
            }

            if (typeof this.props.onClose === 'function') {
                this.props.onClose(this.props.title, this.props.navigator);
            }
        } else {
            this.onChange(!!this.state.value);


        }
    },

    render() {

        return (
            <View style={this.getStyle('rowContainer')}>
                <TouchableHighlight
                    onPress={this._onClose}
                    underlayColor={this.getStyle('underlayColor').pop()}
                    {...this.props} // mainly for underlayColor
                >
                    <View style={this.getStyle('row')}>
                        {this._renderImage()}
                        <Text numberOfLines={1} style={this.getStyle('switchTitle')}>
                            {this.props.title}
                        </Text>
                        {this._renderCheckmark()}
                    </View>
                </TouchableHighlight>
            </View>
        );
    },

    defaultStyles: {
        rowImage: {
            height: 20,
            width: 20,
            marginLeft: 10,
        },
        checkmark: {
            width: 23,
            marginRight: 10,
            marginLeft: 10,
        },
        rowContainer: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1 / PixelRatio.get(),
            borderColor: '#c8c7cc',
        },
        row: {
            flexDirection: 'row',
            height: 44,
            alignItems: 'center',
        },
        underlayColor: '#c7c7cc',
        switchTitle: {
            fontSize: 15,
            color: '#000',
            flex: 0.7,
            paddingLeft: 10,
        },
    },
});
let ImagePicker = require('react-native-image-picker');
const PhotoPickerWidget = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {

        return ({
            // onChange: null,
            type: 'PhotoPickerWidget',

        });
    },

    getInitialState(){
        return {value: []}
    },
    componentWillMount(){

        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

    },
    componentDidMount() {
        // get value from prop
        if (typeof this.props.value !== 'undefined') {
            this._setValue(this.props.value);
            return;
        }
        // get value from store
        let formState = GiftedFormManager.stores[this.props.formName];
        if (typeof formState !== 'undefined') {
            if (typeof formState.values[this.props.name] !== 'undefined') {
                console.log(this.props.name + " form " + formState.values[this.props.name])
                // console.log(formState)
                this.setState({
                    value: formState.values[this.props.name],
                });
                this._validate(formState.values[this.props.name]);
            }
        }
    },

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
            this.onChange(nextProps.value);
        }
    },
    setValue(value) {

        GiftedFormManager.updateValue(this.props.formName, this.props.name, value);
    },

    onChange(value, onChangeText = true) {
        if (onChangeText === true) {
            //should maintain similar API to core TextInput component
            this.props.onChangeText && this.props.onChangeText(value);
        }

        this.setValue(value);
        this._validate(value);

        this.props.onValueChange && this.props.onValueChange();
        // @todo modal widgets validation - the modalwidget row should inform about validation status
    },

    _onClose() {

        this._onChange(this.state.photos);

        if (typeof this.props.onSelect === 'function') {
            // console.log('onSelect');
            this.props.onSelect(this.props.value);
        }

        if (typeof this.props.onClose === 'function') {
            this.props.onClose(this.props.title, this.props.navigator);
        }


    },

    render() {

        return (
            <View style={[{height: 500}]}>

                <View style={[styles.flex1]}>
                    <ListView dataSource={this.ds.cloneWithRows(this.state.value)}
                              contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}

                              enableEmptySections={true}
                              renderRow={(photo) =>
                                  <View style={[, {
                                      height: 220,
                                      width: 180
                                  },

                                  ]}>
                                      <Card style={[styles.flex1]}>

                                          <View style={[styles.flex1]}>
                                              <Image style={[{
                                                  marginTop: 16, marginBottom: 8,
                                                  width: 132, height: 132,
                                                  resizeMode: Image.resizeMode.stretch,
                                                  backgroundColor: colours.paperGrey300.color
                                              }]}
                                                     source={{uri: photo.uri}}>

                                              </Image>
                                              <View style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text style={[styles.productTitle]}>
                                                          {shortenText(photo.fileName)}
                                                      </Text>
                                                  </View>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text style={[styles.currency]}>

                                                      </Text>
                                                      <Text style={[styles.price]}>
                                                          {photo.width + "x" + photo.height}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>
                                      </Card>
                                  </View>
                              }
                    />

                    <ActionButton style={{zIndex: 9}}

                                  icon="add"
                                  onPress={(text) => {

                                      this.openPicker();


                                  }}
                    />
                </View>
            </View>
        );
    },
    openPicker(){

        let options = {
            title: 'Select product photos',
            mediaType: "photo",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert(response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                // response = {...response,data: 'data:image/jpeg;base64,'+response.data };
                let value = this.state.value;

                value.push(response);
                this._onChange(value);
                this.setState({
                    value
                });

            }
        });
    }


});
