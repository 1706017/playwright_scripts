import {test,expect} from '@playwright/test'

//Hook method 
test.beforeEach(async({page})=>{
    await page.goto("https://sdetqa.vercel.app/filters_practice")
})

//Hook method 
test.afterEach(async({page})=>{
    await page.close()
})
//Verify Add to cart for product 2
//first see if the add to cart for product 2 is visible if yes then click on it 
//filter by using text
test('Verify Add to cart for product 2',async({page})=>{
    //await page.goto("https://sdetqa.vercel.app/filters_practice")
    const product2btn = page
        .getByRole('listitem')
        .filter({hasText:'Product 2'})
        .getByRole('button',{name:'Add to cart'});
        
    //verify if button2 is visible 
    await expect(product2btn).toBeVisible();
    await product2btn.click();
})

test('2.Count items not having "out of stock"',async({page})=>{
    const instockitem=page.locator('.card').nth(1) //css locator .card means it is class and nth(1) means index 1
                          .getByRole('listitem')
                          .filter({hasNotText:'Out of stock'})
    
    //verify instockitem count to be 3 
    await expect(instockitem).toHaveCount(3)
})

test('3.Verify elements using data-testid',async({page})=>{
    const apple = page.getByTestId('apple')
    const banana= page.getByTestId('banana')
    const orange= page.getByTestId('orange')
    const kiwi = page.getByTestId('kiwi')
    const mango = page.getByTestId('mango')

    //Verify visibility
    await expect(apple).toBeVisible()
    await expect(banana).toBeVisible()
    await expect(orange).toBeVisible()
    await expect(kiwi).toBeVisible()
    await expect(mango).toBeVisible()

    //Verify text
    await expect(apple).toContainText('apple')
    await expect(banana).toContainText('banana')
})

test('4.Find "Say goodbye" button for John',async({page})=>{
    const gdbuttonbyjohn = page.locator('.card').nth(3)
        .getByRole('listitem')
        .filter({hasText:'👤 John'})
        .getByRole('button',{name:'Say goodbye'})

    await expect(gdbuttonbyjohn).toBeVisible()
    await expect(gdbuttonbyjohn).toHaveText("Say goodbye")
})
