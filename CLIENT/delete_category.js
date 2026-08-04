import { Selector } from 'testcafe';

fixture('Testing delete a category')
    .page('http://localhost:4000/')
       .beforeEach(async t => {
        await t.setNativeDialogHandler(() => true); //auto accepting the alert, pressing OK!
    });


test('Testing  delete a category', async t => {
    await t
         .wait(2000)
         //clicking add new category btn!
        .click('body > section > div.container > div > div.row.justify-content-center.mt-2.mb-3 > div:nth-child(3) > button')
        .wait(2000)
        .typeText('#category_name_to_delete','sitcom')//adding a new category called 'sitcom'
        .wait(2000)
        .click('#delete_category_form > div > div > button.btn.btn-success')//clicking on add button!
       
        //creating an object from the native dialog pop up history!
        const popUp = await t.getNativeDialogHistory();

        //expected response!
        await t
        .expect(popUp.length).gte(1)
        .expect(popUp[0].type).eql('alert')
        .expect(popUp[0].text).eql('Category has been deleted with success');
});