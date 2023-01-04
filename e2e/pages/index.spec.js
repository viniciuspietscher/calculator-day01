import { test, expect } from "@playwright/test"

test("Calculator for works", async ({ page }) => {
  await page.goto("/")
  await page.type("#first", "1")
  await page.type("#second", "2")
  await page.click("#operation")
  await page.locator("#operation").selectOption("multiply")
  await page.click("button[type='submit']")

  const result = await page.locator("#result")
  await expect(result).toContainText("2")
})

test("Form displays all 3 error messages", async ({ page }) => {
  await page.goto("/")
  await page.click("button[type='submit']")

  const first = await page.locator("#first-helper-text")
  await expect(first).toContainText("First is not a number")

  const second = await page.locator("#second-helper-text")
  await expect(second).toContainText("Second is not a number")

  await expect(
    page.getByText("Operation is not selected", { exact: true })
  ).toBeVisible()
})

test("Form displays error message if user types a string", async ({ page }) => {
  await page.goto("/")
  await page.type("#first", "aaa")
  await page.type("#second", "aaa")
  await page.click("#operation")
  await page.locator("#operation").selectOption("multiply")
  await page.click("button[type='submit']")

  const first = await page.locator("#first-helper-text")
  await expect(first).toContainText("First is not a number")

  const second = await page.locator("#second-helper-text")
  await expect(second).toContainText("Second is not a number")
})

test("Form removes error message from inputs", async ({ page }) => {
  await page.goto("/")
  await page.type("#first", "aaa")
  await page.type("#second", "aaa")
  await page.click("#operation")
  await page.locator("#operation").selectOption("multiply")
  await page.click("button[type='submit']")

  const first = await page.locator("#first-helper-text")
  await expect(first).toContainText("First is not a number")

  const second = await page.locator("#second-helper-text")
  await expect(second).toContainText("Second is not a number")

  await page.type("#first", "12")
  await page.type("#second", "12")

  await expect(
    page.getByText("First is not a number", { exact: true })
  ).not.toBeVisible()

  await expect(
    page.getByText("Second is not a number", { exact: true })
  ).not.toBeVisible()
})

test("Form removes error message from selection box", async ({ page }) => {
  await page.goto("/")
  await page.click("button[type='submit']")

  await expect(
    page.getByText("Operation is not selected", { exact: true })
  ).toBeVisible()

  await page.click("#operation")
  await page.locator("#operation").selectOption("multiply")

  await expect(
    page.getByText("Operation is not selected", { exact: true })
  ).not.toBeVisible()
})

// test("Calculator wants numbers", async ({ page }) => {
//   await page.goto("/");
//   await page.type("#first", "fsdfsdfdsf");
//   await page.type("#second", "2");
//   await page.click("#operation");
//   await page.locator("#operation").selectOption("add");
//   await page.click("button[type='submit']");

//   const result = await page.locator("#result");
//   await expect(result).toContainText("Params");
// });
