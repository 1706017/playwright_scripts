import {test,expect} from '@playwright/test'

const pageUrl='https://sdetqa.vercel.app/autoplay.html'
test.describe('Test suite for dropdown validations',()=>{


    test.beforeEach(async({page})=>{
        await page.goto(pageUrl)
        await expect(page.getByText('AutoPlay')).toBeVisible()
    })

    test('1.Single select dropdown',async({page})=>{

        //1.dropdown should be visisble
        const countrydropdown=page.locator('#country')
        await expect(countrydropdown).toBeVisible()

        //2.default selected value in dropdown should be india
        await expect(countrydropdown).toHaveValue('india')

        //3 ways to select option from dropdown 
        // 1.using label
        // 2.using attributes (if available)
        // 3.using index 

        //selectOption()--> select option from dropdown
        // in selectOption we can pass label,or we can pass attribute or we can 
        // pass index as a parameter 

        //toHaveValue is used with input,select,checkbox 
        //select by label is always preferable 
        await countrydropdown.selectOption({label:'USA'})
        await expect(countrydropdown).toHaveValue('usa')

        //select by option value
        await countrydropdown.selectOption({value:'uk'})
        await expect(countrydropdown).toHaveValue('uk')

        //select option by index - index starts with 0
        await countrydropdown.selectOption({index:3})
        await expect(countrydropdown).toHaveValue('germany')

        //validate option dropdown count it should be 5 as count 
        const multiple_option_cnt=page.locator('#country option')
        await expect(multiple_option_cnt).toHaveCount(5)

        //Validate option contains Germany
        const options_values=await multiple_option_cnt.allTextContents()
        expect(options_values).toContain("Germany")

        //to print each value of option value 
        for(const option_val of options_values){
            console.log(option_val)
        }
    })

    test('2.Multiselect colour dropdown functionality',async({page})=>{
        //1.Multiselect colour drop down should be visible
        const multidropdwm=page.locator('#colors')
        await expect(multidropdwm).toBeVisible()
        console.log("Multiselect dropdown is visible and testcase passed")

        //2.default blue dropdown to be selected 
        await expect(multidropdwm).toHaveValue('blue')
        console.log("Default blue color should be selected test case is passed ")

        //3.Multiple options should be selected using labels red,blue,green
        await multidropdwm.selectOption([{label:'Red'},{label:'Blue'},{label:'Green'}])
        await expect(multidropdwm).toHaveValues(['red','blue','green'])
        console.log('Multiselection of dropdown test case is passed')

        //4.Multiselect dropdown option count
        const multiselectoptions =page.locator('#colors option')
        await expect(multiselectoptions).toHaveCount(4)
        console.log('Multiple selection dropdown passed the count of option test case')

        
    })
})
