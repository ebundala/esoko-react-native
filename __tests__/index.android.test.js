import 'react-native';
import React from 'react';
import Index from '../index.android.js';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

/*
it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  ).toJSON();
    expect(tree).toMatchSnapshot();
});
*/
import {wp_get_db_schema} from "../src/utils/db"
it('wp_get_db_schema', () => {

    expect(()=>{wp_get_db_schema("all", 7);}).anything();
});
