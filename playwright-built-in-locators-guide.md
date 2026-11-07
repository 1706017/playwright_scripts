# Playwright Built-in Locators

A quick reference for the built-in locators Playwright provides to find elements on a page, with the DOM structure and example code for each one.

## Table of Contents

1. [getByRole()](#1-getbyrole)
2. [getByText()](#2-getbytext)
3. [getByLabel()](#3-getbylabel)
4. [getByPlaceholder()](#4-getbyplaceholder)
5. [getByAltText()](#5-getbyalttext)
6. [getByTitle()](#6-getbytitle)
7. [getByTestId()](#7-getbytestid)
8. [Quick Comparison](#quick-comparison)
9. [Best Practices](#best-practices)

---

## 1. getByRole()

Best for **interactive elements**: buttons, checkboxes, radio buttons, links, etc.

**Syntax**

```js
page.getByRole(role, { name: 'accessible name' })
```

**DOM**

```html
<h3>Sign Up</h3>
<label>
  <input type="checkbox" />Subscribe
</label>
<button>Submit</button>
```

**Code**

```js
page.getByRole('checkbox', { name: 'Subscribe' })
page.getByRole('button', { name: 'Submit' })
```

> **Note:** `getByRole()` is the preferred locator for interactive elements like checkboxes, buttons, radio buttons and anchor tags.

---

## 2. getByText()

Best for **non-interactive elements**: `div`, `span`, paragraphs, etc.

**DOM**

```html
<span>Welcome, To Learning JS</span>
```

**Code**

```js
const textValue = page.getByText('Welcome, To Learning JS');
await expect(textValue).toBeVisible();
```

> **Note:** Prefer `getByText()` for non-interactive elements like `div`, `span` and paragraphs.

---

## 3. getByLabel()

Best for **form fields that have a visible label**.

**DOM**

```html
<label for="email-addr">Email Address</label>
<input type="email" id="email-addr" />
```

**Code**

```js
const emailField = page.getByLabel('Email Address');
await expect(emailField).toBeVisible();
await emailField.fill('tester@gmail.com');
```

> **Note:** Use `getByLabel()` for form fields with visible labels.

---

## 4. getByPlaceholder()

Best for **inputs without a label** but with a placeholder.

**DOM**

```html
<input type="email" placeholder="name@example.com" />
```

**Code**

```js
await page.getByPlaceholder('name@example.com').fill('123@gmail.com');
```

---

## 5. getByAltText()

Locates **images** by their `alt` attribute text.

**DOM**

```html
<img alt="playwright-logo" src="/img/plog.svg" />
```

**Code**

```js
await page.getByAltText('playwright-logo').click();
```

---

## 6. getByTitle()

Locates elements by their **`title` attribute**.

**DOM**

```html
<span title="Issue count">25 issues</span>
```

**Code**

```js
const titleEle = page.getByTitle('Issue count');
await expect(titleEle).toHaveText('25 issues');   // exact text
await expect(titleEle).toContainText('25');       // partial text
```

---

## 7. getByTestId()

Locates elements by their **`data-testid` attribute**.

**DOM**

```html
<button data-testid="directions">Itinerary</button>
```

**Code**

```js
await page.getByTestId('directions').click();
```

---

## Quick Comparison

| Locator | Use it for | Matches on |
|---|---|---|
| `getByRole()` | Buttons, checkboxes, radios, links | ARIA role + accessible name |
| `getByText()` | `div`, `span`, paragraphs | Visible text |
| `getByLabel()` | Form fields with a visible label | Associated `<label>` text |
| `getByPlaceholder()` | Inputs with no label | `placeholder` attribute |
| `getByAltText()` | Images | `alt` attribute |
| `getByTitle()` | Elements with a tooltip/title | `title` attribute |
| `getByTestId()` | Anything, when nothing else is stable | `data-testid` attribute |

## Best Practices

- Prefer **user-facing locators** first: `getByRole()`, `getByText()`, `getByLabel()`.
- Fall back to `getByTestId()` only when nothing else is stable.
- Use `getByRole()` for interactive elements and `getByText()` for non-interactive ones.

## Reference

- Official docs: https://playwright.dev/docs/locators
