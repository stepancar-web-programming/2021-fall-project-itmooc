import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GlobalStyles from './theme/globalStyles';

Enzyme.configure({ adapter: new Adapter() });

describe('App render', () => {
    it('it should render successfully', () => {
        const wrapper = shallow(<GlobalStyles />);
        expect(wrapper).toMatchSnapshot();
    });
});
