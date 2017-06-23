/**
 * Created by ebundala on 6/23/2017.
 */
<GiftedForm
    formName='newReview' // GiftedForm instances that use the same name will also share the same states

    openModal={(route) => {
        // console.log(route.getTitle())
        //navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
    }}

    clearOnClose={false} // delete the values of the form when unmounted

    defaults={{

        /* "description": "",
         "name": "",
         "image":[],
         "itemCondition":"",
         "model":"",
         "category":"",
         "brand":"",
         "color":"",
         "height":"",
         "width":"",
         "weight":"",
         "sku":"",
         "manufacturer":"",

         "offers": {
         "type": "Offer",
         "availability": "InStock",
         "price": {"type":"price"},
         "priceCurrency": {"type":"currency"},
         "acceptedPaymentMethod":{"type":"acceptedPaymentMethod"},
         "areaServed":{"type":"areaServed"},
         "availableDeliveryMethod":{"type":"availableDeliveryMethod"},
         "warranty":{"type":"warranty"}
         },
         "additionalProperty":{"type":"additionalProperty"}*/
    }}
>

    <GiftedForm.SeparatorWidget  />
    <RatingWidget
        title='Rate this'
        name='rating'
        starSize={24}
        starStyle={{marginHorizontal:5}}
        starColor={colours.paperOrange500.color}
        disabled={false}
        maxStars={5}

    />
    <GiftedForm.TextAreaWidget
        name='review'
        autoFocus={false}
        placeholder='What do you think about this item'
    />

    <GiftedForm.SeparatorWidget  />



    <GiftedForm.SubmitWidget
        title='Submit'
        widgetStyles={{
            submitButton: {
                backgroundColor:"blue" //themes.mainColor,
            }
        }}
        onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {

                console.log(values);
                // prepare object
                //values.gender = values.gender[0];
                // values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                /* Implement the request to your server using values variable
                 ** then you can do:
                 ** postSubmit(); // disable the loader
                 ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                 ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                 ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                 */
            }
        }}

    />

    <GiftedForm.NoticeWidget
        title='By submitting a review, you agree to the Terms of Service and Privacy Policy.'
    />

    <GiftedForm.HiddenWidget name='userID' value={user.UID} />
    <GiftedForm.HiddenWidget name='productID' value={product.productID} />
    <GiftedForm.HiddenWidget name='userName' value={user.displayName} />
    <GiftedForm.HiddenWidget name='reviewerAvator' value={user.photoUrl} />

</GiftedForm>

let WidgetMixin = require('react-native-gifted-form/mixins/WidgetMixin.js');

const RatingWidget = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {
        return {
            inline: true,
            // @todo type avec suffix Widget pour all
            type: 'RatingWidget',

        }
    },

    getInitialState() {
        return {

            value:0,
        }
    },

    _renderTitle() {
        if (this.props.title !== '') {
            return (
                <Text
                    numberOfLines={1}
                    style={this.getStyle(['ratingInputTitleInline'])}
                >
                    {this.props.title}
                </Text>
            );
        }
        return (
            <View style={this.getStyle(['spacer'])}/>
        );
    },

    _renderRow() {

        if (this.props.inline === false) {
            return (
                <View style={this.getStyle(['rowContainer'])}>
                    <View style={this.getStyle(['titleContainer'])}>
                        {this._renderImage()}
                        <Text numberOfLines={1} style={this.getStyle(['ratingInputTitle'])}>{this.props.title}</Text>
                    </View>

                    <TextInput
                        ref='input'
                        style={this.getStyle(['ratingInput'])}

                        {...this.props}

                        onFocus={this.onFocus}
                        onBlur={this.onBlur}


                        onChangeText={this._onChange}
                        value={this.state.value}
                    />
                    {this._renderValidationError()}
                    {this._renderUnderline()}
                </View>
            );
        }
        return (
            <View style={this.getStyle(['rowContainer'])}>
                <View style={this.getStyle(['row'])}>
                    {this._renderImage()}
                    {this._renderTitle()}

                    <StarRating
                        {...this.props}
                        rating={this.state.value}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                </View>
                {this._renderValidationError()}
                {this._renderUnderline()}
            </View>
        );

    },


    onStarRatingPress(rating) {
        let oldVal = this.state.value;
        let newVal = rating;
        if (newVal !== oldVal) {
            this.setState({
                value: rating
            });
            this._onChange(newVal);
        }

    },


    _renderUnderline() {
        if (this.props.underlined === true) {
            if (this.state.focused === false) {
                return (
                    <View
                        style={this.getStyle(['underline', 'underlineIdle'])}
                    />
                );
            }
            return (
                <View
                    style={this.getStyle(['underline', 'underlineFocused'])}
                />
            );
        }
        return null;
    },

    render() {
        return this._renderRow();
    },

    defaultStyles: {
        rowImage: {
            height: 20,
            width: 20,
            marginLeft: 10,
        },
        underline: {
            marginRight: 10,
            marginLeft: 10,
        },
        underlineIdle: {
            borderBottomWidth: 2,
            borderColor: '#c8c7cc',
        },
        underlineFocused: {
            borderBottomWidth: 2,
            borderColor: '#3498db',
        },
        spacer: {
            width: 10,
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
        titleContainer: {
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // selfAlign: 'center',
            // backgroundColor: '#ff0000',
        },
        ratingInputInline: {
            fontSize: 15,
            flex: 1,
            height: 40,// @todo should be changed if underlined
            marginTop: 2,
        },
        ratingInputTitleInline: {
            width: 110,
            fontSize: 15,
            color: '#000',
            paddingLeft: 10,
        },
        ratingInputTitle: {
            fontSize: 13,
            color: '#333',
            paddingLeft: 10,
            flex: 1
        },
        ratingInput: {
            fontSize: 15,
            flex: 1,
            height: 40,
            marginLeft: 40,
        },
    },
});
