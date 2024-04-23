import Input from './Input';

describe('<Input />', () => {
  it('renders', () => {
    renderInput();
  });

  it('should update input with desired debounce', () => {
    const inputText = 'test the debounce input';

    renderInput();

    cy.get('input').type(inputText);
    cy.wait(500);
    cy.get('@onChangeSpy').should('have.been.calledWith', inputText);
    cy.get('input').should('contain.value', inputText);
  });
});

const renderInput = () => {
  const value = '';
  const onChangeSpy = cy.spy().as('onChangeSpy');
  const debounce = 500;

  return cy.mount(
    <Input value={value} onChange={onChangeSpy} debounce={debounce} />
  );
};
