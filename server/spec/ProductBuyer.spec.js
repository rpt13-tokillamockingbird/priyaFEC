import React from 'react';
import { shallow } from 'enzyme';
import ProductBuyer from '../../client/src/components/ProductBuyer';
describe('ProductBuyer', () => {
    it('should check div ProductBuyer is present', () => {
        const component = shallow(<ProductBuyer />);
        expect(component.find('div.ProductBuyer')).to.have.lenghtOf(1);
    });
});