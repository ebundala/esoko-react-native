/**
 * Created by ebundala on 6/17/2017.
 */
//import 'react-native';
//import React from 'react';
//import Index from '../index.android.js';
// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';
import {wp_get_db_schema} from "../src/utils/db"
it('wp_get_db_schema', () => {

    expect(()=>{wp_get_db_schema("all", 7);}).anything();
});