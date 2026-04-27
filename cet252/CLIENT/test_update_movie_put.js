import { Selector } from 'testcafe';

fixture('testing put end point through client')
    .page('http://localhost:4000/')
     .beforeEach(async t => {
        await t.setNativeDialogHandler(() => true); //auto accepting the alert, pressing OK!
    });

test('testing put end point through client', async t => {
    await t
     
    //clicking on edit button in movie the Mask!
    .wait(2000)
    .click('#moviesGrid > div > div > div:nth-child(1) > div > div > button')
    .wait(2000)
    //clicking on update button!
    .click('#movieGrid > div > div > div > div > div > div.col-md-7 > div > div > button.btn.btn-primary.w-100.mb-2.text-center')
    .wait(2000)
    //deleting the existed date!
    .selectText('#movieDate')//selecting the text!
    .wait(2000)
    .pressKey('delete')//deleting the text!
    .wait(2000)
    .typeText('#movieDate','1995')//chaning the release date
    .wait(2000)
    .click('#form-container > form > button')//clicking the update btn!      


      //create a variable to get alert history!
         const popUp = await t.getNativeDialogHistory();

         //expected result!
          await t
         .expect(popUp[0].type).eql('alert')
         .expect(popUp[0].text).eql('Movie has been updated with success!');
});