/* eslint-disable global-require */

export const exposeGlobals = () => {
    let dep;
    let shouldRequireDefault;
    switch (global.enzymeAdapterDescriptor) {
        case 'react13':
            dep = 'enzyme-adapter-react-13';
            break;
        case 'react14':
            dep = 'enzyme-adapter-react-14';
            break;
        case 'react15':
            dep = 'enzyme-adapter-react-15';
            break;
        case 'react15.4':
            dep = 'enzyme-adapter-react-15.4';
            break;
        case 'react16':
            dep = 'enzyme-adapter-react-16';
            break;
        case 'react18':
        default:
            dep = 'enzyme-adapter-react-18';
            shouldRequireDefault = true;
    }

    let Adapter;
    try {
        // eslint-disable-next-line import/no-dynamic-require
        Adapter = shouldRequireDefault ? require(dep).default : require(dep);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(
            `
        Requiring the proper enzyme-adapter during jest-enzyme setup failed.
        This most likely happens when your application does not properly list the
        adapter in your devDependencies. Run this line to add the correct adapter:
        > yarn add --dev ${dep}
        or with npm
        
        > npm i --save-dev ${dep}
        `, e
        );
        return;
    }

    const {
        configure,
        mount,
        render,
        shallow
    } = require('enzyme');
    // Setup Enzyme Adapter
    configure({ adapter: new Adapter() });
    global.shallow = shallow;
    global.mount = mount;
    global.render = render;
    global.React = require('react');
};
