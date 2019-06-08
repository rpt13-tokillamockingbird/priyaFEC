import React from 'react';
import { shallow } from 'enzyme';
import ProductBuyer from '../../client/src/components/ProductBuyer';


describe('ProductBuyer', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<ProductBuyer debug />);
        expect(component).toMatchSnapshot();
    });

    it('should check if className ProductBuyer is present', () => {
        const component = shallow(<ProductBuyer debug />);
        let className = component.find('.ProductBuyer');
        expect(className.length).toEqual(1);

        //expect(component).toMatchSnapshot();
    });
});