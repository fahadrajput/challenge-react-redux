import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Machines from './Machines'
import Health from './Components/Health'
import { useHistory, useParams } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import renderer from 'react-test-renderer';

test('renders /machines link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/machines/i);
  expect(linkElement).toBeInTheDocument();
})


describe('Health', () => {
  test('render Health Progress', () => {
    const component = renderer.create(<Health health={70} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Health', () => {
  test('render Machines list Progress', () => {
    const component1 = renderer.create(<Machines useHistory={useHistory()} />);
    let tree = component1.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
