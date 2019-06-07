import React from 'react';
import { shallow } from 'enzyme';
import ProductBuyer from '../../client/src/components/ProductBuyer';

// describe('ProductBuyer', () => {
//     it('should check div ProductBuyer is present', () => {
//         const component = shallow(<ProductBuyer />);
//         console.log(component);
//         expect(component.find('div.ProductBuyer')).to.have.lenghtOf(1);
//     });
// });

describe('ProductBuyer', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<ProductBuyer debug />);
        expect(component).toMatchSnapshot();
    });
});