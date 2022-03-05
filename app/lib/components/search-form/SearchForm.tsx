import React from 'react'
import { Form, useTransition } from 'remix'

import { Icon } from '../icon/Icon'

interface SearchFormProps {
  query: string | null
}

export const SearchForm: React.FC<SearchFormProps> = ({ query }) => {
  const transition = useTransition()

  return (
    <Form className="search-form">
      <input
        type="text"
        name="q"
        className="search-form__input"
        defaultValue={query ?? ''}
      />
      <button className="search-form__action" type="submit">
        {transition.state === 'submitting' ? <Searching /> : <Search />}
      </button>
    </Form>
  )
}

const Searching: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
    />
  </svg>
)

const Search: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)
