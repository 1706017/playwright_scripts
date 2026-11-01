import {test,expect} from '@playwright/test'

test("Playwright locators",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");
    //1.getByRole() code
    const projectslink = page.getByRole('link',{name:'Projects'});
    await expect(projectslink).toBeVisible();

    const signinbutton = page.getByRole('button',{name:'Sign In'});
    await expect(signinbutton).toBeVisible();

    await signinbutton.click();

    //2.getByText() code
    //It is used to fetch non interactive element like div,span,p etc.

    await expect(page.getByText('Welcome, John! 👋')).toBeVisible()

    //3.getByLabel() code
    //It is used for form field to locate it using its label text.
    //when to use: Ideal for form fields with visible labels.

    const emailfield =page.getByLabel('Email Address')
    await expect(emailfield).toBeVisible()
    await emailfield.fill("tester@gmail.com")

    //4.getByPlaceholder() code
    //it is used for form input field without having label but it has placeholder 

    const ph_avaialblity=page.getByPlaceholder('Search tests...')
    await expect(ph_avaialblity).toBeVisible()
    await ph_avaialblity.fill("Hello ji")

    //5.getByAltText() code
    //to locate an image based on its alt attribute text 

    const imglg=page.getByAltText('Playwright logo')
    await expect(imglg).toBeVisible()
    await imglg.click()

    //6.getByTitle() code
    //to locate an element using title attribute 
    await expect(page.getByTitle('Total test runs')).toHaveText('4,821Total Runs')
})
