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

    /4.checkbox validation
    test('4.Checkbox validation',async({page})=>{
        //1.select sun checkbox
        const sundayCheckbox= page.getByLabel('Sun')
        await sundayCheckbox.check()
        await expect(sundayCheckbox).toBeChecked()

        //select all the checkboxes(Mon-Sun)
        const allDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        for(const day of allDays){
            const checkboxfield=page.getByLabel(day)
            await checkboxfield.check()
            await expect(checkboxfield).toBeChecked()
        }

        //uncheck fri,sat,sun and then verify 
        for(const day of ['Fri','Sat','Sun']){
            const uncheckfield=page.getByLabel(day)
            await uncheckfield.uncheck()
            await expect(uncheckfield).not.toBeChecked()
            
        }

        //toggle all checkboxes if check->uncheck and if uncheck->check
        for(const day of allDays){
            const checkboxfield=page.getByLabel(day)
            if(await checkboxfield.isChecked()){
                await checkboxfield.uncheck()
                await expect(checkboxfield).not.toBeChecked()
            }
            else{
                await checkboxfield.check()
                await expect(checkboxfield).toBeChecked()
            }
        }
        //select checkbox with Label Fri
        const fridayField=page.getByLabel('Fri')
        await fridayField.check()
        await expect(fridayField).toBeChecked()

        await page.waitForTimeout(8000)

    })

    test('5.Button Validations',async({page})=>{
        
        const submitbutton= page.getByRole('button',{name:'Submit'}).first()
        await expect(submitbutton).toBeVisible()
        await submitbutton.click()
        await expect(submitbutton).toBeEnabled()
        await page.waitForTimeout(8000)
        //await expect(buttonfield).toBeChecked()
    })

    //field level functional validations
    test('6.Field level functional validation',async({page})=>{
        //On submission of empty field error message should appear 
        const namefield=page.getByLabel('Full name')
        const emailfield=page.getByLabel('Email')
        const phonefield=page.getByLabel('Phone')
        const addfield=page.getByLabel('Address')
        const errmsg=page.locator('#formErrors')

        await namefield.fill('')
        await emailfield.fill('')
        await phonefield.fill('')
        await addfield.fill('')

        const buttonfield =page.getByRole('button',{name:'Submit'}).first()
        await buttonfield.click()

        await expect(errmsg).toBeVisible()
        await expect(errmsg).toContainText('Please fix the following:')
    })

    //email address validation 
    test('7.Email Address validation',async({page})=>{
        const emailfield=page.getByLabel('Email')
        const submitbutton=page.getByRole('button',{name:'Submit'}).first()
        const errmsg=page.locator('#formErrors')
        await emailfield.fill('sss.com')
        await submitbutton.click()
        
        await expect(errmsg).toBeVisible()
        await expect(errmsg).toContainText('Please enter a valid email address.')

    })

});
