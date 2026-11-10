import {test,expect} from '@playwright/test'

const pageUrl='https://sdetqa.vercel.app/autoplay.html'

//here it is our test suit which contains all the test cases related to data entry form validation
test.describe('Data entry form validation',()=>{

    //hook method 
    test.beforeEach(async({page})=>{
        await page.goto(pageUrl)

        await expect(page.getByText('AutoPlay')).toBeVisible()

    })

    //1.Page Load Validation 
    test('1.Page Load Validation test case',async({page})=>{
        //1.Open the url and verify the page loaded
        await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay')
        //2.Verify that the AutoPlay heading is visible
        await expect(page.getByText('AutoPlay')).toBeVisible()

    })

    test('2.Input fields validations',async({page})=>{
        const nameField=page.getByLabel('Full name')
        const emailField=page.getByLabel('Email')
        const phoneField=page.getByLabel('Phone')
        const addressField=page.getByLabel('Address')

        //Full name field should be visible and enabled
        await expect(nameField).toBeVisible()
        await expect(nameField).toBeEnabled()

        //Verify maxlength attribute(should be 15) or any attribute value
        //here we have passed two params attribute name and its value
        await expect(nameField).toHaveAttribute('maxlength','15')

        //Enter and verify full name value 
        await nameField.fill('John Canedy')
        await expect(nameField).toHaveValue('John Canedy')

        //Email field should be visible
        await expect(emailField).toBeVisible()
        //Enter value in email field and match the value it should match
        await emailField.fill("tester@example.com")
        await expect(emailField).toHaveValue("tester@example.com")

        //Phone field should be visible and accept value
        await expect(phoneField).toBeVisible()
        await phoneField.fill("+91 1234567898")
        await expect(phoneField).toHaveValue('+91 1234567898')

        //Address field should be visible and accept multi line text
        await expect(addressField).toBeVisible()
        addressField.fill('Bina Niketa \n near vishal mega mart \n tilkamanjhi')
        await expect(addressField).toHaveValue('Bina Niketa \n near vishal mega mart \n tilkamanjhi')

    })

    test('3.Radio Button (Gender) Validation ',async({page})=>{
        //verify male and female radio button should be visible
        const maleRadiobtn=page.getByRole('radio', { name: 'Male', exact: true })
        const femaleRadiobtn=page.getByRole('radio', { name: 'Female', exact: true })

        await expect(maleRadiobtn).toBeVisible()
        await expect(femaleRadiobtn).toBeVisible()
        //female radio button to be selected and verified if it is selected
        await femaleRadiobtn.check()
        await expect(femaleRadiobtn).toBeChecked()
        await expect(maleRadiobtn).not.toBeChecked()
    })

});
