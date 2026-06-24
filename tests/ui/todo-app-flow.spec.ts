import { expect, test } from '@playwright/test'
import { TodoPage } from '../pages/todo-page'


const URL = 'https://todo-app.tallinn-learning.ee/'

let todoPage: TodoPage

test.beforeEach(async ({ page }) => {
  await page.goto(URL)
  todoPage = new TodoPage(page)
})

test('Create a task', async ({ page }) => {
  await todoPage.todoInput.fill('My first task')
  await todoPage.todoInput.press('Enter')

  await expect(todoPage.todoItemLabel).toBeVisible()
})

test('Create two tasks and validate filter', async ({ page }) => {
  await todoPage.todoInput.fill('This is my first task')
  await todoPage.todoInput.press('Enter')

  await todoPage.todoInput.fill('This is my second task')
  await todoPage.todoInput.press('Enter')

  await expect(todoPage.todoItemLabel.first()).toBeVisible()
})

test('Create a task and activate it', async ({ page }) => {
  await todoPage.todoInput.fill('My first task to complete')
  await todoPage.todoInput.press('Enter')

  await todoPage.toggle.click()

  await expect(todoPage.todoItemLabel.first()).toBeVisible()

  await todoPage.completedLink.click()
  await expect(todoPage.todoItemLabel).toHaveCount(1)

  await todoPage.activeLink.click()
  await expect(todoPage.todoItemLabel).toHaveCount(0)

  await todoPage.clearBtn.click()
  await expect(todoPage.todoItemLabel).toHaveCount(0)
})

test('Create a task and rename it', async ({ page }) => {
  const taskName = 'This is my first task'
  const updatedTaskName = 'Renamed task'

  await todoPage.todoInput.fill(taskName)
  await todoPage.todoInput.press('Enter')

  let text: string = await todoPage.todoItemLabel.textContent()
  console.log(text)

  await todoPage.todoItemLabel.dblclick()
  await page.getByTestId('todo-item').getByTestId('text-input').fill(updatedTaskName)
  await page.getByTestId('todo-item').getByTestId('text-input').press('Enter')

  text = await todoPage.todoItemLabel.textContent()
  console.log(text)

  expect(text).toBe(updatedTaskName)
})
