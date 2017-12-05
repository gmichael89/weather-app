import React from 'react';
import CoordinateDataTable from '../../src/components/Common/CoordinateDataTable';
import renderer from 'react-test-renderer';

test('Table doesn\'t render when no input is provided.', () => {

    const component = renderer.create(
        <CoordinateDataTable />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});

test('Table renders with provided latitude and longitude.', () => {

    const coords = {
        lat: 53.4186504,
        lng: -2.2391706
    };

    const component = renderer.create(
        CoordinateDataTable(coords)
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
