import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Simple example component
const ExampleComponent = () => {
  return <div data-testid='example'>Hello World</div>
}

describe('ExampleComponent', () => {
  it('renders correctly', () => {
    render(<ExampleComponent />)
    const element = screen.getByTestId('example')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe('Hello World')
  })
})
