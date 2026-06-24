import { Locator, Page } from '@playwright/test'

export class TodoPage {
  readonly page: Page
  readonly todoInput: Locator
  readonly todoItemLabel: Locator
  readonly toggle: Locator
  readonly completedLink: Locator
  readonly activeLink: Locator
  readonly clearBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.todoInput = page.getByTestId('text-input')
    this.todoItemLabel = page.getByTestId('todo-item-label')
    this.toggle = page.getByTestId('todo-item-toggle')
    this.completedLink = page.getByRole('link', { name: 'completed' })
    this.activeLink = page.getByRole('link', { name: 'active' })
    this.clearBtn = page.getByRole('button', { name: 'clear completed' })
  }
}
