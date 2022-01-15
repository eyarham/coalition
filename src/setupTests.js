// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';

// enzyme rendering docs: https://enzymejs.github.io/enzyme/docs/installation/index.html
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // TODO: Update to official adapter once released

jest.mock("firebase/firestore", () => {
  return {
    getFirestore: jest.fn(),
  };
});

configure({ adapter: new Adapter() });
