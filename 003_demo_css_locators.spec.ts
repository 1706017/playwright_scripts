import {test,expect} from '@playwright/test'

test.describe("CSS TEST SUIT",()=>{
test('Css with ID',async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    const searchbox=page.locator("#small-searchterms")
    await searchbox.fill("14.1-inch Laptop")

    await page.locator('[value="Search"]').click()

    await expect(page.locator('h2[class="product-title"] a')).toHaveText('14.1-inch Laptop')

   // await page.close()
})

test('Css with class',async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    const searchbox_withclass=page.locator(".search-box-text")
    await searchbox_withclass.fill("14.1-inch Laptop")

    await page.locator('[value="Search"]').click()
    await page.waitForTimeout(5000)

    await expect(page.locator('h2[class="product-title"] a')).toHaveText("14.1-inch Laptop")
    await page.close()

})

test('Css with Attribute',async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    const searchbox_withattribute=page.locator('[value="Search store"]')
    await searchbox_withattribute.fill("14.1-inch Laptop")
    await page.locator('[value="Search"]').click()

    await expect(page.locator('h2[class="product-title"] a')).toHaveText("14.1-inch Laptop")

})
})
