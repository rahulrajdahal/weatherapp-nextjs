import Input from './Input';

describe('<Input />', () => {
  it('renders', () => {
    cy.mount(<Input value={''} onChange={() => console.log('value')} />);
  });
  it('should update input with desired debounce', () => {
    const debounce = 500;
    const inputText = 'test the debounce input';

    cy.mount(
      <Input
        value={''}
        onChange={() => console.log('value')}
        debounce={debounce}
      />
    );
    cy.get('input').type(inputText);
    cy.wait(debounce);
    cy.get('input').should('contain.value', inputText);
  });
});
