import { _builQuery } from '../fetch'

describe('_builQuery()', () => {
  it('should return a query', () => {
    const componentState = {
      textInput: '42',
      page: '2',
      filters: [
        {name: 'keywords', value: 'keyword1'},
        {name: 'keywords', value: 'keyword2'},
        {name: 'organizations', value: 'foo'},
      ],
    }
    const expectedUrl = 'q=42&page=2&keywords=keyword1&keywords=keyword2&organizations=foo'

    const builQuery = _builQuery(
      componentState.textInput,
      componentState.filters,
      componentState.page,
    )
    expect(builQuery).toEqual(expectedUrl)
  })
})
